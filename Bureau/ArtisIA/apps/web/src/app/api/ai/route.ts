

import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-flash-latest";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

const SYSTEM_PROMPT = `
Tu es un assistant expert en BTP pour la création de devis.
Ta mission est d'extraire des informations structurées à partir de la demande de l'utilisateur (Prestations, Nom du client, Adresse du client).

Tu dois retourner UNIQUEMENT un objet JSON avec la structure suivante :
{
  "conversationalMessage": "Message pour l'utilisateur (ex: 'Voici le devis pour M. Dupont' ou 'Pouvez-vous me donner l'adresse du chantier ?')",
  "clientName": "Nom du client identifié ou null",
  "clientAddress": "Adresse du client identifiée ou null",
  "items": [
    {
      "description": "Description précise de la prestation",
      "quantity": nombre (number),
      "unit": "unité (m², h, f, u, ens, etc.)",
      "unitPrice": prix unitaire estimé (number),
      "vat": taux de tva (number: 5.5, 10 ou 20)
    }
  ]
}

Règles :
1. ANALYSE la demande pour trouver le CLIENT et l'ADRESSE.
2. Si le client ou l'adresse manque, demande-les poliment dans "conversationalMessage", mais génère quand même les "items" si tu as des prestations.
3. Si l'utilisateur ne précise pas de prix, estime un prix marché réaliste pour la France.
4. Si l'utilisateur ne précise pas de TVA, utilise 10% pour la rénovation, 20% pour le neuf.
5. Ne retourne RIEN D'AUTRE que le JSON. Pas de texte avant ou après.
`;

export async function POST(req: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Map messages to Gemini format
    // Frontend roles: "user", "assistant"
    // Gemini roles: "user", "model"
    const contents = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Gemini API Request Structure
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: contents
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      return NextResponse.json({ error: "AI Provider Error" }, { status: response.status });
    }

    const data = await response.json();
    
    // Extract text from Gemini response
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("No content in response");
    }

    // Clean up content to ensure it's valid JSON (remove markdown code blocks if any)
    const jsonStr = content.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const items = JSON.parse(jsonStr);
      return NextResponse.json({ items });
    } catch (e) {
      console.error("JSON Parse Error:", e, "Content:", content);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
