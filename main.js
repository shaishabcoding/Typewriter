const $ = (e, p = document) => p.querySelectorAll(e);
let timer;

function main() {
  const hidden_containers = $('.hidden_container');
  [...hidden_containers].forEach((p) => {
    const hidden_parent = p.parentElement,
      isHidden = $('.isHidden', hidden_parent)[0],
      hidden_text = $('.hidden_text', p)[0],
      hidden_input = $('.hidden_input', p)[0];
    let isHiddenState = true;

    isHidden.onclick = () => {
      if (isHiddenState)
        showText(hidden_input, hidden_text);

      else
        removeText(hidden_input);



      isHiddenState = !isHiddenState;
    }

    hidden_input.style.width = hidden_text.clientWidth + 'px';
    hidden_input.style.height = hidden_text.clientHeight + 'px';
    setTimeout(
      () => {
        hidden_text.style.display = 'none';
      }, 1
    );
    hidden_input.onfocus = () => {
      hidden_input.classList.add("simple_text")
    }
    hidden_input.addEventListener("keyup", (event) => {
      isHidden.checked = false;
      isHiddenState = true;
      if (!hidden_input.value)
        hidden_input.style.borderColor = "black";

      if (hidden_input.value === hidden_text.innerHTML.trim()) {
        isHidden.checked = true;
        isHidden.disabled = true;
        hidden_input.disabled = true;
      }

    });


  });
}

function showText(e, p) {
  let i = 0;
  const txt = p.innerHTML.trim(),
    speed = 100;

  e.style.borderColor = "transparent";
  e.value = "";
  e.classList.remove("simple_text");

  (typeWriter = () => {
    e.click();
    e.focus();
    if (i < txt.length) {
      e.value += txt.charAt(i++);
      timer = setTimeout(typeWriter, speed);
    }
  })();
};

function removeText(e) {
  clearTimeout(timer);
  e.value = "";
  e.style.borderColor = "black";

}


main()