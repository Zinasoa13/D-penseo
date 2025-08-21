<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 p-4">
    <!-- Added animated background particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Transformed to dark theme with glass morphism effect -->
    <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-1000 animate-fade-in-up">
      <!-- Added animated title with gradient text -->
      <div class="text-center mb-8 animate-fade-in delay-200">
        <h2 class="text-3xl font-bold bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent mb-2">
          Créer un compte
        </h2>
        <p class="text-slate-300 text-sm">Rejoignez notre communauté</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- Enhanced username field with icon and animations -->
        <div class="animate-fade-in delay-300">
          <label class="block mb-2 font-medium text-slate-200">
            <i class="fas fa-user mr-2 text-teal-400"></i>
            Nom d'utilisateur
          </label>
          <div class="relative">
            <input
              v-model="username"
              type="text"
              placeholder="Votre nom d'utilisateur"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-300 backdrop-blur-sm"
              required
            />
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/0 to-blue-400/0 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-20"></div>
          </div>
        </div>

        <!-- Enhanced email field with validation -->
        <div class="animate-fade-in delay-400">
          <label class="block mb-2 font-medium text-slate-200">
            <i class="fas fa-envelope mr-2 text-teal-400"></i>
            Email
          </label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="votre@email.com"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-300 backdrop-blur-sm"
              required
            />
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/0 to-blue-400/0 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-20"></div>
          </div>
        </div>

        <!-- Enhanced password field with strength indicator -->
        <div class="animate-fade-in delay-500">
          <label class="block mb-2 font-medium text-slate-200">
            <i class="fas fa-lock mr-2 text-teal-400"></i>
            Mot de passe
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Votre mot de passe"
              class="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-300 backdrop-blur-sm"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-teal-400 transition-colors duration-200"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/0 to-blue-400/0 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-20"></div>
          </div>
          
          <!-- Added password strength indicator -->
          <div v-if="password" class="mt-2">
            <div class="flex space-x-1">
              <div 
                v-for="i in 4" 
                :key="i"
                class="h-1 flex-1 rounded-full transition-all duration-300"
                :class="i <= passwordStrength ? getStrengthColor(passwordStrength) : 'bg-slate-600'"
              ></div>
            </div>
            <p class="text-xs mt-1" :class="getStrengthTextColor(passwordStrength)">
              {{ getStrengthText(passwordStrength) }}
            </p>
          </div>
        </div>

        <!-- Enhanced submit button with loading state -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in delay-600 relative overflow-hidden"
        >
          <span v-if="!isLoading" class="flex items-center justify-center">
            <i class="fas fa-user-plus mr-2"></i>
            S'inscrire
          </span>
          <span v-else class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Création en cours...
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </form>

      <!-- Enhanced error and success messages -->
      <div class="mt-6 space-y-2">
        <div 
          v-if="error" 
          class="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-center animate-shake backdrop-blur-sm"
        >
          <i class="fas fa-exclamation-triangle mr-2"></i>
          {{ error }}
        </div>
        <div 
          v-if="success" 
          class="bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-xl text-center animate-bounce backdrop-blur-sm"
        >
          <i class="fas fa-check-circle mr-2"></i>
          {{ success }}
        </div>
      </div>

      <!-- Enhanced login link -->
      <div class="mt-6 text-center animate-fade-in delay-700">
        <p class="text-slate-300 text-sm">
          Vous avez déjà un compte ?
          <router-link 
            to="/login" 
            class="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200 hover:underline ml-1"
          >
            Se connecter
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const passwordStrength = computed(() => {
  if (!password.value) return 0
  let strength = 0
  if (password.value.length >= 8) strength++
  if (/[A-Z]/.test(password.value)) strength++
  if (/[0-9]/.test(password.value)) strength++
  if (/[^A-Za-z0-9]/.test(password.value)) strength++
  return strength
})

const getStrengthColor = (strength) => {
  switch (strength) {
    case 1: return 'bg-red-500'
    case 2: return 'bg-yellow-500'
    case 3: return 'bg-blue-500'
    case 4: return 'bg-green-500'
    default: return 'bg-slate-600'
  }
}

const getStrengthTextColor = (strength) => {
  switch (strength) {
    case 1: return 'text-red-400'
    case 2: return 'text-yellow-400'
    case 3: return 'text-blue-400'
    case 4: return 'text-green-400'
    default: return 'text-slate-400'
  }
}

const getStrengthText = (strength) => {
  switch (strength) {
    case 1: return 'Mot de passe faible'
    case 2: return 'Mot de passe moyen'
    case 3: return 'Mot de passe fort'
    case 4: return 'Mot de passe très fort'
    default: return ''
  }
}

const handleRegister = async () => {
  if (!email.value || !password.value || !username.value) {
    error.value = 'Tous les champs sont obligatoires.'
    return
  }

  if (passwordStrength.value < 2) {
    error.value = 'Le mot de passe doit être plus fort.'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    }

    localStorage.setItem('user', JSON.stringify(newUser))

    success.value = 'Compte créé avec succès ! Redirection en cours...'
    
    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
  } catch (err) {
    error.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
.delay-600 { animation-delay: 0.6s; }
.delay-700 { animation-delay: 0.7s; }
.delay-1000 { animation-delay: 1s; }
</style>
