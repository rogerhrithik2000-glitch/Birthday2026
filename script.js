/* Mission: Make Baby Smile — customise the messages below. */
const QUIZ_PHOTO_SETS = [
  ['assets/quiz2-photo1.JPG', 'assets/quiz2-photo2.PNG', 'assets/quiz2-photo3.jpg'],
  ['assets/quiz1-photo1.JPG', 'assets/quiz1-photo2.JPG', 'assets/quiz1-photo3.JPG'],
  ['assets/quiz3-photo1.jpg', 'assets/quiz3-photo2.jpg', 'assets/quiz3-photo3.jpg']
];

const CONTENT = {
  name: "Kanak",
  tea: "Our future household will have a very important employee: a dedicated tea-making person whose only job is to make sure Baby's tea needs are met. The job description is strict. The benefits package is mostly your happiness.",
  sushi: "My first sushi was with you at Kara Kara, which feels like a pretty great way to start a food memory. Somehow, even trying something new gets more memorable when it's with you.",
  admire: "Your kindness, your humour, your intelligence, and all the little things that make you who you are. I could keep listing things, but we'd need a much bigger website.",
  trip: "I'm looking forward to our trip — new places, good food, silly moments, and memories we'll keep bringing up long after we get home.",
  letter: `Happy birthday, my Baby 💗

I hope this year brings you as much warmth, laughter, and ease as you bring into my life. You have a way of making ordinary days feel softer, brighter, and a little more beautiful just by being in them. Even from a distance, you are still so present in my heart.

One of my favourite little memories is having my first sushi with you at Kara Kara. It was such a simple moment, but it somehow became one of those memories that stays with you — the kind that feels like a chapter in our story. I love that even the smallest moments with you become meaningful.

I admire your kindness, your humour, your intelligence, and all the gentle, beautiful things that make you so completely you. You are thoughtful in ways that stay with people, and you make the world feel a little more lovable just by being in it. And yes, I still fully support the future hiring plan for the very important person whose entire job is to make tea for you. A highly specialised role. An essential service.

Even when we're apart, I carry you with me in the ordinary parts of my day. I think about you, I miss you, and I keep looking forward to all the real moments we still get to share — the hand-holding, the laughter, the food, the quiet days, the moments where I get to be close to you in person. I can't wait for the day I get to celebrate you properly, right beside you.

I hope your birthday feels as lovely, special, and unforgettable as you are. You deserve a year full of calm days, happy surprises, big milestones, and all the love you give so freely.

Happy birthday, my Baby. I am so lucky to love you, and I can't wait for all the days we'll get to spend together in person. 💗`,
  sign: "All my love, always 💗",
  heartMessages: [
    "Heart 1: You make ordinary days feel a little less ordinary. 💗",
    "Heart 2: Your laugh deserves its own fan club. 😂",
    "Heart 3: Extremely smart. Extremely kind. Extremely cute. Unfair, really.",
    "Heart 4: The tea-making employee recruitment campaign starts soon. 🍵",
    "Heart 5: Saving the biggest hug for our next trip. 🫂"
  ],
  quiz: [
    {
      q: "Do you remember our first date? Where was it?",
      a: ["Kara Kara, with you and sushi🍣", "At a five-star sushi lab", "In a dream about soy sauce", "The answer is classified"],
      correct: 0,
      right: "Correct! My first sushi was with you at Kara Kara. A small memory, but a favourite. 💗",
      wrong: "A confident guess! But it was Kara Kara, with you. The memory has been fact-checked by the boyfriend."
    },
    {
      q: "What essential service must our future household provide?",
      a: ["A 24/7 snack department", "A dedicated tea-making person 🍵", "A full time assistant to do everything for you", "A stylist"],
      correct: 1,
      right: "Exactly. Hiring for the position of Official Tea Person begins immediately. Applicants must be excellent at tea and adore Baby.",
      wrong: "Very reasonable suggestion, but the tea department is non-negotiable. The job exists because Baby deserves premium service."
    },
    {
      q: "When did we become US?",
      a: ["When we first met at Radisson", "When video calls became mandatory part of the day", "When i proposed to you", "When I made tea for you"],
      correct: 2,
      right: "Yes. The answer is When i proposed to you. The quiz committee would like to address the absolute necessity of asking out as a deal breaker.",
      wrong: "Nice try, but this was a trick question. Think think think"
    }
  ],
  notes: [
    {title:"The tea department", text:"Our future household will have a very important employee: a dedicated tea-making person whose entire job is to make tea for you. Strict standards. Excellent benefits. The benefits are your happiness. 🍵"},
    {title:"A first for the memory books", text:"My first sushi was with you at Kara Kara. I love that a first-time experience became one of our little memories. Here's to many more firsts, favourite foods, and stories together. 🍣"},
    {title:"What makes you you", text:"The most beautiful day of my life when we became US. 🌷"}
  ]
};

let questionIndex = 0;
let answered = false;
let collected = new Set();
let openedNotes = new Set();
const $ = id => document.getElementById(id);

function startGame(){ showLevel('quiz'); renderQuestion(); window.scrollTo({top:0,behavior:'smooth'}); }
function showLevel(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  $('welcome').style.display='none';
  $(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='hearts' && !$('heartField').children.length) buildHearts();
}
function loadQuizPhotoSet(questionNumber){
  const frames=['quizPhotoA','quizPhotoB','quizPhotoC'];
  const set = QUIZ_PHOTO_SETS[questionNumber] || [];

  frames.forEach((frameId, index) => {
    const frame = $(frameId);
    if (!frame) return;

    const src = set[index];
    if (src) {
      setPhoto(frameId, src, `Question ${questionNumber + 1} memory ${index + 1}`);
      frame.classList.remove('revealed-photo');
      frame.classList.add('hidden-photo');
    } else {
      frame.classList.remove('loaded');
      frame.classList.remove('revealed-photo');
      frame.classList.add('hidden-photo');
      frame.innerHTML = '<div class="placeholder">💗<br>photo moment</div>';
    }
  });
}
function revealQuizPhotos(){
  document.querySelectorAll('#quiz .photo').forEach((photo) => {
    photo.classList.remove('hidden-photo');
    photo.classList.add('revealed-photo');
  });
}
function renderQuestion(){
  const item=CONTENT.quiz[questionIndex];
  $('question').textContent=`${questionIndex+1}. ${item.q}`;
  $('answers').innerHTML='';
  $('quizFeedback').textContent='';
  $('quizNext').disabled=true;
  $('quizNext').textContent=questionIndex===CONTENT.quiz.length-1?'Collect some hearts →':'Next question →';
  answered=false;
  loadQuizPhotoSet(questionIndex);
  item.a.forEach((answer,i)=>{
    const b=document.createElement('button'); b.className='answer'; b.textContent=answer;
    b.onclick=()=>chooseAnswer(i,b); $('answers').appendChild(b);
  });
}
function chooseAnswer(i,button){
  const item=CONTENT.quiz[questionIndex];
  if(i===item.correct){
    [...$('answers').children].forEach((b,n)=>{if(n===item.correct)b.classList.add('correct');b.disabled=true;});
    answered=true;
    $('quizFeedback').textContent=item.right;
    $('quizNext').disabled=false;
    revealQuizPhotos();
    celebrate();
    return;
  }

  button.classList.add('wrong');
  button.disabled=true;
  $('quizFeedback').textContent=item.wrong;
  $('quizNext').disabled=true;
}
function nextQuestion(){
  if(!answered)return;
  if(questionIndex<CONTENT.quiz.length-1){questionIndex++;renderQuestion();}
  else showLevel('hearts');
}
function buildHearts(){
  const field=$('heartField'); field.innerHTML='';
  const icons=['💗','💖','💕','💘','💝','💓','💞','❤️','💟','💗'];
  icons.forEach((icon,i)=>{
    const b=document.createElement('button');b.className='heart';b.textContent=icon;b.setAttribute('aria-label',`Collect heart ${i+1}`);
    b.onclick=()=>collectHeart(i,b);field.appendChild(b);
  });
}
function collectHeart(i,button){
  if(collected.has(i))return;
  collected.add(i);button.classList.add('got');button.textContent='✓';button.disabled=true;
  $('heartCounter').textContent=`${collected.size} / 5 collected`;
  $('progress').style.width=`${Math.min(collected.size/5,1)*100}%`;
  $('heartMessage').textContent=CONTENT.heartMessages[(collected.size-1)%CONTENT.heartMessages.length];
  toast(CONTENT.heartMessages[(collected.size-1)%CONTENT.heartMessages.length]);
  if(collected.size>=5){$('heartNext').disabled=false;$('heartMessage').textContent='Mission powered up! Five hearts collected. You are, officially, very loved. 💗';}
}
function openNote(button,i){
  if(openedNotes.has(i))return;openedNotes.add(i);button.classList.add('open');
  button.innerHTML=`<span class="emoji">${['🍵','🍣','🌷'][i]}</span><span><strong>${CONTENT.notes[i].title}</strong><small>${CONTENT.notes[i].text}</small></span>`;
  $('memoryCount').textContent=`${openedNotes.size} / 3 opened`;
}
function revealLetter(){
  $('letterContent').style.display='block';$('openLetter').textContent='Your letter is open 💗';$('openLetter').disabled=true;
  $('letterText').textContent=CONTENT.letter;$('letterSign').textContent=CONTENT.sign;celebrate();
  setTimeout(()=>$('letterContent').scrollIntoView({behavior:'smooth',block:'start'}),100);
}
function celebrate(){
  const bits=['💗','💖','✨','🌸','💕','🎉','💘'];
  for(let i=0;i<48;i++){
    const el=document.createElement('span');el.className='confetti';el.textContent=bits[Math.floor(Math.random()*bits.length)];
    el.style.left=Math.random()*100+'vw';el.style.animationDelay=Math.random()*.9+'s';el.style.fontSize=(14+Math.random()*17)+'px';
    document.body.appendChild(el);setTimeout(()=>el.remove(),3800);
  }
}
let toastTimer;
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}

function setMedia(frameId, src, caption, type = 'image') {
  const frame = $(frameId);
  if (!frame) return;

  frame.innerHTML = '';
  frame.classList.remove('loaded');

  if (type === 'video') {
    const video = document.createElement('video');
    video.src = src;
    video.alt = caption || 'A personal video';
    video.controls = true;
    video.muted = true;
    video.playsInline = true;
    video.style.display = 'block';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.borderRadius = 'inherit';
    frame.appendChild(video);
    frame.classList.add('loaded');
    return;
  }

  const img = new Image();
  img.alt = caption || 'A personal photo';
  img.onload = () => {
    frame.appendChild(img);
    frame.classList.add('loaded');
  };
  img.onerror = () => {
    console.warn(`Could not load ${src}. Check the image path.`);
    frame.innerHTML = '<div class="placeholder">💗<br>photo moment</div>';
  };
  img.src = src;
}

function setPhoto(frameId, src, caption) {
  setMedia(frameId, src, caption, 'image');
}

function setVideo(frameId, src, caption) {
  setMedia(frameId, src, caption, 'video');
}

function applyEdits(){
  CONTENT.name=$('editName').value.trim()||'Baby';
  CONTENT.tea=$('editTea').value;CONTENT.sushi=$('editSushi').value;CONTENT.admire=$('editAdmire').value;CONTENT.trip=$('editTrip').value;
  CONTENT.notes[0].text=CONTENT.tea;CONTENT.notes[1].text=CONTENT.sushi;CONTENT.notes[2].text=CONTENT.admire;
  CONTENT.letter=$('editLetter').value;CONTENT.sign=$('editSign').value;
  document.querySelector('.hero h1').innerHTML=`Mission:<br><span>Make ${escapeHtml(CONTENT.name)} Smile</span>`;
  $('letterText').textContent=CONTENT.letter;$('letterSign').textContent=CONTENT.sign;
  toast('Preview updated! For a permanent edit, update script.js too.');
}
function resetEdits(){location.reload();}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

/* PHOTO FILES: add your own images to assets/ and uncomment the lines you want.
   Keep each section's images unique and personal.
   Use different files for each frame so you are not repeating the same photo across the site.
   If you want a video in any slot, use setVideo() instead of setPhoto().
*/
// Welcome section
setPhoto('photo1', 'assets/hero1.jpg', 'My favourite photo');
setPhoto('photo2', 'assets/hero2.jpg', 'A candid smile');
// setPhoto('photo3', 'assets/hero3.jpg', 'Our favourite memory');
// setPhoto('photo4', 'assets/hero4.jpg', 'A silly moment');
setPhoto('photo5', 'assets/hero5.jpg', 'The one I always love');

// Memory section
// setPhoto('memoryPhotoA', 'assets/memory1.jpg', 'Kara Kara memory');
// setPhoto('memoryPhotoB', 'assets/memory2.jpg', 'A favourite photo');

// Final letter section
// setPhoto('finalPhotoA', 'assets/final1.jpg', 'A lovely memory');
// setPhoto('finalPhotoB', 'assets/final2.jpg', 'A little smile');
// setPhoto('finalPhotoC', 'assets/final3.jpg', 'A real-life hug to come');

// VIDEO EXAMPLES: use these only when you want a video instead of a photo.
// setVideo('photo2', 'assets/clip1.mp4', 'A cute video moment');
// setVideo('finalPhotoB', 'assets/final-video.mp4', 'Our happy little video');

function applyContentToScreen(){
  $('letterText').textContent=CONTENT.letter;$('letterSign').textContent=CONTENT.sign;
}
applyContentToScreen();
