<template>
  <footer class="footer">
    <p>&copy; EQUATOR 2023</p>
    <nav>
      <RouterLink to="/">Legal Notice</RouterLink>
      <span style="color: white"> | </span>
      <RouterLink to="/">Terms of Use</RouterLink>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style>
.footer {
  background-color: #15181e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  height: 68px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 3%;
  top: 0;
}

.footer p {
  color: white;
  margin: 0;
}
</style>
