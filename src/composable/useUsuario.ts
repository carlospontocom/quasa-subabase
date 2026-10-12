//src/composable/useUsuario
import { ref } from 'vue'
import { supabase } from '@/boot/supabase';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export function useUsuario() {
  const $q = useQuasar()
  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const loading = ref(false)

  const handleLogin = async () => {
    loading.value = true

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (error) throw error

      $q.notify({
        type: 'positive',
        message: 'Login realizado com sucesso!',
        position: 'top'
      })

      // Redireciona para a página interna do sistema (/dashboard)
      router.push('/dashboard')
    } catch (error: any) {
      $q.notify({
        type: 'negative',
        message: 'Erro ao fazer login: ' + (error.message || 'Verifique suas credenciais'),
        position: 'top'
      })
    } finally {
      loading.value = false
    }
  }
  

  return {
    email,
    password,
    loading,
    handleLogin
  }
}

// VITE_SUPABASE_URL=https://mjydscivngccazwoyblg.supabase.co
// VITE_SUPABASE_ANON_KEY=sb_publishable_8ecTSNBYnMnUbR1ynntDCw_LZC-h94P