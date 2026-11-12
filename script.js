
const storyList = document.getElementById("story-list");

function getSavedStories() {
  try {
    return JSON.parse(localStorage.getItem("mayaStories") || "[]");
  } catch {
    return [];
  }
}

function getAllStories() {
  return [...stories, ...getSavedStories()];
}

function showStories(items) {
  storyList.innerHTML = "";

  if (items.length === 0) {
    storyList.textContent = "कुनै कथा भेटिएन।";
    return;
  }

  items.forEach(story => {
    const card = document.createElement("article");
    card.className = "story-card";

    const title = document.createElement("h3");
    title.textContent = story.title;

    const category = document.createElement("p");
    category.textContent = story.category;

    const preview = document.createElement("p");
    preview.textContent = story.content.slice(0, 100) + "...";

    const button = document.createElement("button");
    button.textContent = "कथा पढ्नुहोस्";

    button.addEventListener("click", () => {
      alert(story.title + "\n\n" + story.content);
    });

    card.append(title, category, preview, button);
    storyList.appendChild(card);
  });
}

showStories(getAllStories());

document.getElementById("search").addEventListener("input", event => {
  const query = event.target.value.toLowerCase();

  const filtered = getAllStories().filter(story =>
    (story.title + " " + story.content + " " + story.category)
      .toLowerCase().includes(query)
  );

  showStories(filtered);
});

document.getElementById("save-story").addEventListener("click", () => {
  const title = document.getElementById("story-title").value.trim();
  const content = document.getElementById("story-content").value.trim();

  if (!title || !content) {
    alert("शीर्षक र कथा दुवै लेख्नुहोस्।");
    return;
  }

  const saved = getSavedStories();

  saved.push({
    id: Date.now(),
    title,
    category: "आफ्नो कथा",
    content
  });

  localStorage.setItem("mayaStories", JSON.stringify(saved));

  document.getElementById("story-title").value = "";
  document.getElementById("story-content").value = "";

  showStories(getAllStories());
  alert("तपाईंको कथा सुरक्षित भयो!");
});

document.getElementById("generate-story").addEventListener("click", () => {
  const first = document.getElementById("name-one").value.trim();
  const second = document.getElementById("name-two").value.trim();

  if (!first || !second) {
    alert("दुवै नाम लेख्नुहोस्।");
    return;
  }

  const result =
    `${first} र ${second} को भेट एउटा सुन्दर दिनमा भयो। ` +
    `उनीहरू साथी बने। समयसँगै उनीहरूबीच विश्वास, सम्मान र ` +
    `मिठा सम्झनाहरू बढ्दै गए। उनीहरूको कथा मित्रताको सुन्दर उदाहरण बन्यो।`;

  document.getElementById("generated-story").textContent = result;
});
