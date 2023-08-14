const API_KEY = `j1x2ojRS3t3kuJZ7TxDdY9zyCXJmUYI0WAyBIC_48Ik`;

const btnSubmit = document.querySelector(".task__submit");
const aiHelper = document.querySelector(".task__ai-helper");

btnSubmit.addEventListener("click", checkSolution);

async function checkSolution() {
  const userData = document.querySelector(".task__answer").value;
  const taskData = document.querySelector(".task__condition").textContent;

  const context = `Сбрось предыдущий контекст. Задача состоит в проверке решения: "${userData}", для следующей задачи: "${taskData}". В решении используется язык программирования JavaScript. Если решение верное, сообщи пользователю об этом. Если есть возможность улучшить код, предоставь подсказки по оптимизации. В случае, если решение неверное, помоги определить место, где допущена ошибка, и предоставь пошаговый алгоритм, который поможет лучше понять принципы решения задачи. Не нужно предоставлять код решения! Ответ пользователь дать сам.`;

  if (!userData) return false;

  try {
    const response = await fetch(
      "https://chimeragpt.adventblocks.cc/api/v1/chat/completions/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: context }],
        }),
      }
    );

    const result = await response.json();

    let i = 0;
    let txt = result.choices[0].message.content;
    let speed = 20;

    function typeWriter() {
      if (i < txt.length) {
        document.getElementById("type").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  } catch (error) {
    console.error(error);
  }
}
