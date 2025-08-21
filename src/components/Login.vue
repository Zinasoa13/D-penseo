<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 p-4">
    <!-- Background animated elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
    
    <!-- Main login card with animations -->
    <div 
      class="relative bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700/50 transform transition-all duration-1000"
      :class="{ 'animate-fade-in-up': mounted }"
    >
      <!-- Header with animation -->
      <div class="text-center mb-8">
        <div 
          class="w-16 h-16 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mx-auto mb-4 flex items-center justify-center transform transition-all duration-700 delay-300"
          :class="{ 'animate-bounce-in': mounted }"
        >
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h2 
          class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 transform transition-all duration-700 delay-500"
          :class="{ 'animate-fade-in': mounted }"
        >
          Se connecter
        </h2>
        <p 
          class="text-slate-400 mt-2 transform transition-all duration-700 delay-700"
          :class="{ 'animate-fade-in': mounted }"
        >
          Accédez à votre espace personnel
        </p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email field with animation -->
        <div 
          class="transform transition-all duration-700 delay-900"
          :class="{ 'animate-slide-in-left': mounted }"
        >
          <label class="block mb-2 font-semibold text-slate-300">Email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="votre@email.com"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              required
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Password field with animation -->
        <div 
          class="transform transition-all duration-700 delay-1100"
          :class="{ 'animate-slide-in-right': mounted }"
        >
          <label class="block mb-2 font-semibold text-slate-300">Mot de passe</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-teal-400 transition-colors"
            >
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Submit button with animation -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform transition-all duration-700 delay-1300"
          :class="{ 'animate-fade-in-up': mounted }"
        >
          <span v-if="!isLoading" class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            Se connecter
          </span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connexion...
          </span>
        </button>
      </form>

      <!-- Messages with animations -->
      <Transition name="slide-fade">
        <div v-if="error" class="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center backdrop-blur-sm">
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ error }}
        </div>
      </Transition>

      <Transition name="slide-fade">
        <div v-if="success" class="mt-4 p-3 bg-teal-500/20 border border-teal-500/30 rounded-lg text-teal-400 text-center backdrop-blur-sm">
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ success }}
        </div>
      </Transition>

      <!-- Footer with animation -->
      <p 
        class="mt-6 text-center text-sm text-slate-400 transform transition-all duration-700 delay-1500"
        :class="{ 'animate-fade-in': mounted }"
      >
        Vous n'avez pas de compte ?
        <router-link 
          to="/register" 
          class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-300 hover:to-teal-300 font-semibold transition-all duration-300"
        >
          S'inscrire
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const mounted = ref(false)

// Animation trigger
onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 100)
})

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''
  success.value = ''

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const storedUser = JSON.parse(localStorage.getItem('user'))

  if (storedUser && storedUser.email === email.value && storedUser.password === password.value) {
    success.value = 'Connexion réussie !'
    setTimeout(() => {
      window.location.href = '/home'
    }, 1500)
  } else {
    error.value = 'Email ou mot de passe incorrect.'
  }
  
  isLoading.value = false
}

// Création d'un utilisateur par défaut pour tester
if (!localStorage.getItem('user')) {
  localStorage.setItem('user', JSON.stringify({
    email: 'test@example.com',
    password: '123456'
  }))
}
</script>

<style scoped>
/* Custom animations */
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
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-bounce-in {
  animation: bounce-in 0.8s ease-out forwards;
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.6s ease-out forwards;
}

/* Transition for messages */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
