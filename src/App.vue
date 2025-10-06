<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Sistema de Gestión de Maratón</h1>
    </header>

    <nav class="app-nav">
      <router-link to="/ciudades" class="nav-link">Ciudades</router-link>
      <router-link to="/atletas" class="nav-link">Atletas</router-link>
    </nav>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.app-header h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

.app-nav {
  background-color: #34495e;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #2c3e50;
}

.nav-link.router-link-active {
  background-color: #3498db;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}
</style>