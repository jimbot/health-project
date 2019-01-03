// const CLIENT_ID = '9HUgvS4sb8arsXxc';

var CLIENT_ID;
var chatIDarr = ['voCS4BwquXZm2xcv', '9HUgvS4sb8arsXxc', 'X9dxLSgS44YK86kW', 'P7LtfYuKJhpcvZFw', 'eEyJPvLBByOfY3JW', 'hFOhKc45zj2wHcm2', 'EzMoCzftV3UBsrA8', 's2MBc4uQtn5tVW9T'];
if(window.location.href == 'https://shrouded-thicket-53002.herokuapp.com/home/5c2d75709499b3327fc351f7')
{
 CLIENT_ID = chatIDarr[0];
}
else if(window.location.href == 'https://shrouded-thicket-53002.herokuapp.com/home/5c2d773148e2ad32b90f2509')
{
 CLIENT_ID = chatIDarr[1];
}

const drone = new ScaleDrone(CLIENT_ID, {
    data: { // Will be sent out as clientData via events
      name: getName(),
        //name: getRandomName(),
      color: getRandomColor(),
    },
  });

  let members = [];

  drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully connected to Scaledrone');

    const room = drone.subscribe('observable-room', { historyCount: 5});
    room.on('open', error => {
      if (error) {
        return console.error(error);
      }
      console.log('Successfully joined room');
    });
    room.on('history_message', message => console.log(message))

    room.on('members', m => {
      members = m;
      updateMembersDOM();
    });

    room.on('member_join', member => {
      members.push(member);
      updateMembersDOM();
    });

    room.on('member_leave', ({id}) => {
      const index = members.findIndex(member => member.id === id);
      members.splice(index, 1);
      updateMembersDOM();
    });

    room.on('data', (text, member) => {
      if (member) {
        addMessageToListDOM(text, member);
      } else {
        // Message is from server
      }
    });
  });

  drone.on('close', event => {
    console.log('Connection was closed', event);
  });

  drone.on('error', error => {
    console.error(error);
  });

  function getRandomName() {
    const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
    const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
    return (
      adjs[Math.floor(Math.random() * adjs.length)] +
      "_" +
      nouns[Math.floor(Math.random() * nouns.length)]
    );
  }
  function getName(){
      //username = prompt("enter username for chat");
      //if (username ==''|| username == undefined){
          username =  getRandomName();
      //}
      return username;
  }

  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

  //------------- DOM STUFF

  const DOM = {
    membersCount: document.querySelector('.members-count'),
    membersList: document.querySelector('.members-list'),
    messages: document.querySelector('.messages'),
    input: document.querySelector('.message-form__input'),
    form: document.querySelector('.message-form'),
  };

  DOM.form.addEventListener('submit', sendMessage);

  function sendMessage() {
    const value = DOM.input.value;
    if (value === '') {
      return;
    }
    DOM.input.value = '';
    drone.publish({
      room: 'observable-room',
      message: value,
    });
  }

  function createMemberElement(member) {
    const { name, color } = member.clientData;
    const el = document.createElement('div');
    el.appendChild(document.createTextNode(name));
    el.className = 'member';
    el.style.color = color;
    return el;
  }

  function updateMembersDOM() {
    DOM.membersCount.innerText = `${members.length} users in room:`;
    DOM.membersList.innerHTML = '';
    members.forEach(member =>
      DOM.membersList.appendChild(createMemberElement(member))
    );
  }

  function createMessageElement(text, member) {
    const el = document.createElement('div');
    el.appendChild(createMemberElement(member));
    el.appendChild(document.createTextNode(text));
    el.className = 'message';
    return el;
  }

  function addMessageToListDOM(text, member) {
    const el = DOM.messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(createMessageElement(text, member));
    if (wasTop) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  }
