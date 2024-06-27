document.write(`
<header>
<img src="/imgs/logo.png" alt="" class="logo">
<nav id="menuInicial">
    <div class="container">
        <a href="../index.html" class="opc">Inicio</a>
        <a href="/html/nosotros.html" class="opc">Nosotros</a>
        <a href="#" class="opc" onclick="abrirProductos()"">Productos</a>
        <a href="/html/admin.html" class="opc">Administrar</a>
    </div>
</nav>

<nav class="menuProductos-Invisible" id="btnProductos">
        <a class="opcProductos" href="#">Notebooks</a>
        <a class="opcProductos" href="#">Componentes</a>
        <a class="opcProductos" href="#">Perifericos</a>
        <a class="opcProductos" href="#">Tablets</a>
        <a class="opcProductos" href="#">Celulares</a>
        <a class="opcProductos" href="#">Comodidad</a>
    </nav>

<div id="menuHambur">
    <button id="btnMenuMobile" onclick="abrirMenu()"><i class="fa-solid fa-bars"></i></button>
</div>

<nav class="menuMobile">
    <div class="menuMobile-Invisible" id="menuQuery">
        <a href="../index.html" class="opc">Inicio</a>
        <a href="/html/nosotros.html" class="opc">Nosotros</a>
        <a href="#" class="opc" onclick="abrirProductos()"">Productos</a>
        <a href="/html/admin.html" class="opc">Administrar</a>
    </div>
</nav>
</header>
`)