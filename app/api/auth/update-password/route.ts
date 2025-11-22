import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialiser le client Supabase avec la clé de service
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    // Récupérer le token du header d'autorisation
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token d\'accès manquant ou invalide' },
        { status: 401 }
      )
    }
    
    const token = authHeader.split(' ')[1]
    
    try {
      // Vérifier le token et récupérer l'utilisateur
      const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
      
      if (userError || !user) {
        throw new Error(userError?.message || 'Utilisateur non trouvé')
      }
      
      // Mettre à jour le mot de passe avec le client admin
      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
        password: password,
        email_confirm: true
      })
      
      if (error) throw error
      
      return NextResponse.json({ 
        success: true,
        user: data.user 
      })
      
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du mot de passe:', error)
      return NextResponse.json(
        { error: error.message || 'Erreur lors de la mise à jour du mot de passe' },
        { status: 400 }
      )
    }
    
  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
