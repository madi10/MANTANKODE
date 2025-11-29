(function(){
  const data = [
    {
      url: "https://s.shopee.co.id/2VjWyw0WSW",
      img: "https://raw.githubusercontent.com/madi10/MANTANKODE/refs/heads/master/rumah/2VjWyw0WSW.webp",
      title: "Tas Gunung / Carrier Atmos 60 Liter"
    },
    {
      url: "https://s.shopee.co.id/8ANtl8EBxS",
      img: "https://raw.githubusercontent.com/madi10/MANTANKODE/refs/heads/master/rumah/8ANtl8EBxS.webp",
      title: "Jas Hujan Ponco+Celana Waterproof"
    }
  ];

  const pick = data[Math.floor(Math.random() * data.length)];

  document.getElementById("mkSlot").innerHTML = `
    <div class="mkSlot">
      <a href="${pick.url}" target="_blank" rel="nofollow noopener">
        <img src="${pick.img}" alt="${pick.title}" loading="lazy" />
        <div class="t">${pick.title}</div>
      </a>
    </div>
  `;
})();
