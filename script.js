let introTyping = new Audio('sounds/lobby/introTyping.mp3')
introTyping.volume = 0.1
let footsteps = new Audio('sounds/lobby/footsteps.mp3')
footsteps.volume = 0.2
let introStatusText = 'Unknown'
introAnimation(false)

let BGsoundTrack = new Audio('sounds/lobby/background_sound.mp3')
BGsoundTrack.volume = 0.08
BGsoundTrack.loop = true

let doorOpenSound = new Audio('sounds/lobby/opening-door.mp3')
doorOpenSound.volume = 0.2
let lockDoorSound = new Audio('sounds/lobby/lock-door.mp3')
lockDoorSound.volume = 0.1

function playSound(sound) {
  sound.currentTime = 0
  sound.play()
}

const First_scene_lobby = document.getElementById('First_scene_lobby')
const Second_scene_archive = document.getElementById('Second_scene_archive')
const Third_scene_corridor = document.getElementById('Third_scene_corridor')
const Fourth_scene_room = document.getElementById('Fourth_scene_room')
const final_Scene = document.getElementById('final_Scene')
const finalChooseBG = document.getElementById('finalChooseBG')

const fade = document.getElementById('fade')
let currentScene = 'lobby'

function fadeOutSound(sound, duration = 1000) {
  const startVolume = sound.volume
  const interval = 50
  const step = startVolume / (duration / interval)

  const fade = setInterval(() => {
    sound.volume = Math.max(0, sound.volume - step)

    if (sound.volume <= 0) {
      clearInterval(fade)
      sound.pause()
      sound.currentTime = 0
      sound.volume = startVolume // повертаємо гучність для наступного запуску
    }
  }, interval)
}

function switchScene(hide, show, scene) {
  closeDialog()
  currentScene = scene

  fade.classList.add('active')

  playSound(footsteps)

  setTimeout(() => {
    fadeOutSound(footsteps, 1000)
  }, 2000)

  setTimeout(() => {
    hide.style.display = 'none'
    show.style.display = 'flex'
  }, 3000)

  setTimeout(() => {
    fade.classList.remove('active')
  }, 3500)
}

function fadeInOutElements(element) {
  if (getComputedStyle(element).display === 'none') {
    element.style.display = 'block'
    element.classList.remove('off')
    element.classList.add('on')
  } else {
    element.classList.remove('on')
    element.classList.add('off')
    setTimeout(() => {
      element.style.display = 'none'
    }, 500)
  }
}

const inputFields = document.getElementById('LobbyInput')
const invisibleButtonLobby = document.getElementById('invisible_button_lobby')

invisibleButtonLobby.addEventListener('click', function () {
  fadeInOutElements(inputFields)
})

function shake(shakeMe) {
  shakeMe.classList.add('shake')
  setTimeout(() => shakeMe.classList.remove('shake'), 300)
  playSound(lockDoorSound)
}

const usernameInput = document.getElementById('username_lobby')
const passwordInput = document.getElementById('password_lobby')
const EnterButton = document.getElementById('EnterButton')

function checkUsername() {
  let englishLetters = /^[a-zA-Z\s]+$/
  if (!englishLetters.test(usernameInput.value.trim())) {
    shake(usernameInput)
    return false
  }

  return true
}
function checkPassword() {
  if (passwordInput.value != 'patient217' && passwordInput.value != 'doctor') {
    shake(passwordInput)
    return false
  }

  return true
}

EnterButton.addEventListener('click', function () {
  const usernameValid = checkUsername()
  const passwordValid = checkPassword()

  if (usernameValid && passwordValid) {
    playSound(doorOpenSound)
    switchScene(First_scene_lobby, Second_scene_archive, 'archive')
    /* switchScene(First_scene_lobby, Fourth_scene_room, 'room')*/
    setTimeout(() => {
      typeText('There has to be something about Patient №217 here.', 70, false)
    }, 4200)
  }
})

/*-------------------------------CLICKED SPACE------------------------ */
function clikedSpace(it, button, scene) {
  if (currentScene === scene) {
    if (!it.contains(event.target) && !button.contains(event.target) && it.style.display != 'none') {
      it.classList.remove('on')
      it.classList.add('off')
      setTimeout(() => {
        it.style.display = 'none'
      }, 300)
      return true
    }
  }
  return false
}

document.addEventListener('click', function (event) {
  clikedSpace(paper, invisibleButtonArchivePaper, 'archive')
  clikedSpace(xp_login, invisibleButtonArchiveComputer, 'archive')
})

/*-------------------------ARCHIVE------------------------- */
/*----------------------WINDOWS COMP----------------------- */
const invisibleButtonArchiveComputer = document.getElementById('invisible_button_archive_computer')
const xp_login = document.getElementById('xp_login')
const CloseLogin = document.getElementById('CloseLogin')
const xp_button = document.getElementById('xp_button')
const all_xp_buttons = document.querySelectorAll('.all_xp_buttons')
const archiveOverlayDark = document.getElementById('archiveOverlay')

let ButtonsClick = new Audio('sounds/archive/knopka_windows.mp3')
ButtonsClick.volume = 0.2
let loginSound = new Audio('sounds/archive/login_sound.mp3')
loginSound.volume = 0.2
let correctPasswordSound = new Audio('sounds/archive/correct_password.mp3')
correctPasswordSound.volume = 0.2
let papka = new Audio('sounds/archive/papka.mp3')
papka.volume = 0.2
let errorPasswordSound = new Audio('sounds/archive/errorPassword.mp3')
errorPasswordSound.volume = 0.1

const main_screen_windows = document.getElementById('main_screen')
const screen_papki = document.getElementById('screen_papki')
const invisible_button_windows_papka = document.getElementById('invisible_button_windows_papka')

const password_archive = document.getElementById('password_archive')

function checkPasswordWindows() {
  if (password_archive.value != 'cycle') {
    errorPassword()
    playSound(errorPasswordSound)
    xp_login.style.background = '#ff0000'
    setTimeout(() => {
      xp_login.style.background = '#ece9d8'
    }, 100)
  } else {
    playSound(correctPasswordSound)
    xp_login.style.display = 'none'
    invisibleButtonArchiveComputer.style.display = 'none'
    main_screen_windows.style.display = 'block'
    invisible_button_windows_papka.style.display = 'block'
  }
}
invisible_button_windows_papka.addEventListener('click', function () {
  playSound(papka)
  screen_papki.style.display = 'block'
  invisible_button_windows_papka.style.display = 'none'
  setTimeout(() => {
    typeText(
      "Hmm... There's no information about Patient №217. \n I should keep looking... Maybe I'll find some clues in his room.",
      60,
      true,
    )
  }, 4000)
})

const dialog = document.getElementById('dialog')
const dialogBox = document.getElementById('dialogBox')
const dialogName = document.getElementById('dialogName')
const nextArrow = document.getElementById('nextArrow')
let typeSound = new Audio('sounds/archive/zvuk-pechatnaya-mashinka.mp3')
typeSound.volume = 0.1

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
} /*спросит что єто------------------------------------ */

const intro = document.getElementById('intro')
const introTitle = document.getElementById('introTitle')
const introStatus = document.getElementById('introStatus')

async function typeIntro(element, text, speed) {
  element.textContent = ''

  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i]

    await sleep(speed)
  }
}
async function playEndingIntro(status) {
  introStatusText = status

  // ховаємо все
  final_Scene.style.display = 'none'
  Fourth_scene_room.style.display = 'none'
  First_scene_lobby.style.display = 'none'

  // скидаємо інтро
  intro.style.display = 'flex'
  intro.classList.remove('off')

  introTitle.textContent = ''
  introStatus.textContent = ''

  await introAnimation(true)
}

const wakeupPatient = document.getElementById('wakeupPatient')
const titry = document.getElementById('titry')
const TextTitre = document.getElementById('TextTitre')
let titres = new Audio('sounds/titres.mp3')
titres.volume = 0.2
let beforeTitres = new Audio('sounds/final_sound.mp3')
beforeTitres.volume = 0.05
const tvFlash = document.getElementById('tvFlash')

async function introAnimation(final) {
  await sleep(1500)
  playSound(introTyping)

  await typeIntro(introTitle, 'PATIENT №217', 120)
  introTyping.pause()
  await sleep(1000)

  introStatus.textContent = 'Loading'

  for (let i = 0; i < 7; i++) {
    await sleep(350)

    introStatus.textContent += '.'
    if (i == 3) introStatus.textContent = 'Loading'
  }

  await sleep(700)

  introStatus.textContent = ''
  playSound(introTyping)
  await typeIntro(introStatus, `Status: ${introStatusText}`, 120)
  introTyping.pause()
  await sleep(1500)

  if (final) {
    wakeupPatient.style.display = 'block'

    // Показуємо сцену
    setTimeout(() => {
      playSound(beforeTitres)
    }, 400)

    let tvOffStarted = false

    beforeTitres.ontimeupdate = () => {
      if (!tvOffStarted && beforeTitres.currentTime >= 10.93) {
        tvOffStarted = true

        // Спалах
        wakeupPatient.style.filter = 'brightness(2.4) contrast(3)'

        // Анімація вимкнення
        tvFlash.classList.add('on')
        wakeupPatient.classList.add('off')

        // Через кілька кадрів чорний фон
        setTimeout(() => {
          titry.style.opacity = '1'
        }, 250)
      }
    }

    beforeTitres.onended = () => {
      wakeupPatient.style.display = 'none'

      TextTitre.style.opacity = '1'

      playSound(titres)
    }
  } else if (!final) {
    playSound(BGsoundTrack)
    First_scene_lobby.style.display = 'flex'
    requestAnimationFrame(() => {
      First_scene_lobby.classList.add('active')
    })
    intro.classList.add('off')
    setTimeout(() => {
      typeText(
        "Where am I...? Who am I...? I don't remember... anything... My head... \n (A voice.) - 'Find Patient №217.'",
        80,
        false,
        'lobby',
      )
    }, 2000)
  }

  setTimeout(() => {
    intro.style.display = 'none'
  }, 1000)
}
let nextSceneNeed = false
let countDialogMirror = false
let stopTyping = false

async function wait(ms) {
  await sleep(ms)

  if (stopTyping) {
    throw new Error('Typing cancelled')
  }
}

function closeDialog() {
  stopTyping = true

  typeSound.pause()
  typeSound.currentTime = 0

  dialogBox.classList.add('off')

  setTimeout(() => {
    dialogBox.style.display = 'none'
  }, 300)
}

async function typeText(text, speed, nextSceneNeed, scene) {
  stopTyping = false

  dialogBox.style.display = 'block'
  dialogBox.classList.remove('off')

  nextArrow.style.display = 'none'
  dialog.textContent = ''

  playSound(typeSound)

  try {
    for (let i = 0; i < text.length; i++) {
      dialog.textContent += text[i]

      if (text[i] === '.' || text[i] === '?' || text[i] === '!') {
        typeSound.pause()
      } else if (typeSound.paused) {
        typeSound.play()
      }

      await wait(speed)

      if (text[i] === ',') {
        await wait(150)
      }

      if (text[i] === '.') {
        await wait(350)
      }

      if (text[i] === '!') {
        await wait(400)
      }

      if (dialog.textContent.endsWith('...')) {
        await wait(900)
      }

      if (dialog.textContent.endsWith('?')) {
        await wait(900)
      }
    }
  } catch (e) {
    typeSound.pause()
    typeSound.currentTime = 0
    return
  }

  typeSound.pause()
  typeSound.currentTime = 0

  if (nextSceneNeed) {
    console.log('1')
    nextArrow.style.display = 'block'
    waitForNextScene()
  } else {
    console.log('2')
    countDialogMirror = true

    setTimeout(() => {
      dialogBox.classList.add('off')

      setTimeout(() => {
        dialogBox.style.display = 'none'
      }, 1000)
    }, 3000)
  }
}

function waitForNextScene() {
  console.log('3')
  function nextScene() {
    console.log('4')
    document.removeEventListener('click', nextScene)
    document.removeEventListener('keydown', nextScene)
    dialogBox.classList.add('off')

    setTimeout(() => {
      dialogBox.style.display = 'none'
    }, 1000)

    switchScene(Second_scene_archive, Third_scene_corridor, 'corridor')
  }

  document.addEventListener('click', nextScene)
  document.addEventListener('keydown', nextScene)
}

const texts = [
  { text: 'ACCESS DENIED', color: '#bcbcbc' },
  { text: 'INCORRECT PASSWORD', color: '#f5f5f5' },
  { text: 'WHO ARE YOU?', color: '#f5f5f5' },
  { text: 'FILE CORRUPTED', color: '#d8d1a8' },
  { text: 'PATIENT №217', color: '#ffffff' },
  { text: "DON'T TOUCH IT", color: '#b71c1c' },
  { text: 'STOP!', color: '#ff2b2b' },
]

function errorPassword() {
  const message = document.createElement('div')

  const random = texts[Math.floor(Math.random() * texts.length)]

  message.textContent = random.text
  message.style.color = random.color

  message.classList.add('error_message')

  message.style.fontSize = 20 + Math.random() * 10 + 'px'
  const margin = 20
  const width = message.offsetWidth
  const height = message.offsetHeight

  const x = margin + Math.random() * (window.innerWidth - width - margin * 2)

  const y = margin + Math.random() * (window.innerHeight - height - margin * 2)

  message.style.left = x + 'px'
  message.style.top = y + 'px'

  document.body.appendChild(message)

  setTimeout(() => {
    message.remove()
  }, 2000)
}

invisibleButtonArchiveComputer.addEventListener('click', function () {
  if (getComputedStyle(xp_login).display === 'none') {
    playSound(loginSound)
  }
  fadeInOutElements(xp_login)
})
CloseLogin.addEventListener('click', function () {
  xp_login.style.display = 'none'
  xp_login.classList.remove('on')
  xp_login.classList.add('off')
})
all_xp_buttons.forEach(button => {
  button.addEventListener('click', () => {
    playSound(ButtonsClick)
  })
})
xp_button.addEventListener('click', function () {
  checkPasswordWindows()
})

/* -----------PAPER-----------------------------------------*/
let paperTouched = false
const invisibleButtonArchivePaper = document.getElementById('invisible_button_archive_paper')
const paper = document.getElementById('paper')
let paperSound = new Audio('sounds/archive/paper_sound.mp3')
paperSound.volume = 0.1

invisibleButtonArchivePaper.addEventListener('click', function () {
  paperTouched = true
  fadeInOutElements(paper)
  playSound(paperSound)
})

/*-------------LAMP------------------------------------------ */
const numbers = [5, 12, 3, 25, 3]

let sequencePlayed = false
let sequenceTimeout = null

function spawnNumber(number) {
  const message = document.createElement('div')

  message.textContent = number
  message.style.fontSize = 50 + Math.random() * 15 + 'px'

  message.classList.add('number')

  message.style.top = Math.random() * 80 + 10 + 'vh'
  message.style.left = Math.random() * 80 + 10 + 'vw'

  document.body.appendChild(message)

  setTimeout(() => {
    message.remove()
  }, 2000)
}

function playSequence(index = 0) {
  // Якщо світло увімкнули — одразу зупиняємо
  if (!sequencePlayed) return

  // Якщо всі цифри показані
  if (index >= numbers.length) {
    sequencePlayed = false
    return
  }

  spawnNumber(numbers[index])

  sequenceTimeout = setTimeout(() => {
    playSequence(index + 1)
  }, 2500)
}

const invisibleButtonArchiveLamp = document.getElementById('invisible_button_archive_lamp')
const archiveDarkBG = document.getElementById('archiveDark')

let turn_off_light = new Audio('sounds/archive/turn_off_light.mp3')
turn_off_light.volume = 0.1
let turn_on_light = new Audio('sounds/archive/turn_on_light.mp3')
turn_on_light.volume = 0.1

invisibleButtonArchiveLamp.addEventListener('click', () => {
  archiveOverlayDark.classList.toggle('active')

  if (getComputedStyle(archiveDarkBG).display === 'none') {
    archiveDarkBG.style.display = 'block'
    playSound(turn_off_light)
    if (paperTouched) {
      if (!sequencePlayed) {
        sequencePlayed = true

        sequenceTimeout = setTimeout(() => {
          playSequence()
        }, 3000)
      }
    }
  } else {
    archiveDarkBG.style.display = 'none'
    playSound(turn_on_light)
    sequencePlayed = false

    clearTimeout(sequenceTimeout)
  }
})

/*-------------------------------------CORRIDOR------------------------------------ */
const scene_corridor1 = document.getElementById('corridor1')
const scene_corridor2 = document.getElementById('corridor2')
const scene_corridor3 = document.getElementById('corridor3')
const invisibleButtonCorridorDoor = document.getElementById('invisible_button_corridor_door')
let broke_corridor_sound = new Audio('sounds/corridor/first_broke_corridor.mp3')
broke_corridor_sound.volume = 0.1
let wind_corridor = new Audio('sounds/corridor/wind.mp3')
wind_corridor.volume = 0.05
wind_corridor.loop = true
let sound_screamer1 = new Audio('sounds/corridor/sound_screamer1.mp3')
sound_screamer1.volume = 0.15
let sound_screamer2 = new Audio('sounds/corridor/sound_screamer2.mp3')
sound_screamer2.volume = 0.2

const messageCorridor1 = document.getElementById('messageCorridor1')
const messageCorridor2 = document.getElementById('messageCorridor2')
const messageCorridor3 = document.getElementById('messageCorridor3')
let count = 0
function switchSceneCorridor(hide, show) {
  fade.classList.add('active')
  setTimeout(() => {
    hide.style.display = 'none'
    show.style.display = 'flex'
  }, 1000)
  setTimeout(() => {
    fade.classList.remove('active')
  }, 1500)
}

invisibleButtonCorridorDoor.addEventListener('click', function () {
  count += 1
  if (getComputedStyle(scene_corridor2).display === 'none' && count === 1) {
    broke_corridor_sound.volume = 0.05
    playSound(sound_screamer1)
    playSound(broke_corridor_sound)

    scene_corridor1.style.display = 'none'
    messageCorridor1.style.display = 'block'
    invisibleButtonCorridorDoor.style.display = 'none'
    switchSceneCorridor(scene_corridor1, scene_corridor2)
    setTimeout(() => {
      messageCorridor1.style.display = 'none'
      invisibleButtonCorridorDoor.style.display = 'block'
    }, 800)
  } else if (getComputedStyle(scene_corridor2).display === 'flex' && count === 2) {
    broke_corridor_sound.volume = 0.15
    playSound(wind_corridor)
    playSound(sound_screamer1)
    playSound(broke_corridor_sound)

    scene_corridor2.style.display = 'none'
    messageCorridor2.style.display = 'block'
    invisibleButtonCorridorDoor.style.display = 'none'
    switchSceneCorridor(scene_corridor2, scene_corridor3)
    setTimeout(() => {
      messageCorridor2.style.display = 'none'
      invisibleButtonCorridorDoor.style.display = 'block'
    }, 800)
  } else if (count === 3) {
    playSound(sound_screamer2)
    wind_corridor.pause()
    broke_corridor_sound.volume = 0.25
    playSound(broke_corridor_sound)
    scene_corridor3.style.display = 'none'
    messageCorridor3.style.display = 'block'
    invisibleButtonCorridorDoor.style.display = 'none'
    switchScene(Third_scene_corridor, Fourth_scene_room, 'room')
    setTimeout(() => {
      messageCorridor3.style.display = 'none'
    }, 800)
  }
})

/*------------------ROOM------------------------------------------------------ */
const false_room = document.getElementById('false_room')
const true_room = document.getElementById('true_room')
const invisible_button_mirror_room = document.getElementById('invisible_button_mirror_room')
const secret = 'show the truth'
let typed = ''
let trueRoomActive = false
let mirrorOpenCount = 0
let sayItHintShown = 0

function keyHandler(e) {
  typed += e.key.toLowerCase()

  if (!secret.startsWith(typed)) {
    typed = ''
    true_room.style.opacity = 0
    return true
  }

  let progress = typed.length / secret.length
  true_room.style.opacity = progress

  if (progress >= 1) {
    true_room.style.opacity = 1

    document.removeEventListener('keydown', keyHandler)
    invisible_button_diagnos_room.style.top = '73%'
    invisible_button_notes.style.display = 'block'
    invisible_button_bed.style.display = 'block'
    invisible_button_robe.style.display = 'block'
    invisible_button_clock.style.display = 'block'
    trueRoomActive = true
    return
  }
}

document.addEventListener('keydown', keyHandler)

const archiveOverlay2 = document.getElementById('archiveOverlay2')
const mirror = document.getElementById('mirror')
const doctor = document.getElementById('doctor')

const roomContainer = document.getElementById('roomContainer')
let mirrorDialogTimeout = null
let mirrorFinalStage = 0
let heartbeat = new Audio('sounds/room/heartbeat_1.mp3')
heartbeat.volume = 0.2
let heartbeat2 = new Audio('sounds/room/heartbeat_2beats.mp3')
heartbeat2.volume = 0.3
const invisible_button_final_patient = document.getElementById('invisible_button_final_patient')
const invisible_button_final_doctor = document.getElementById('invisible_button_final_doctor')
const finalChoosePatient = document.getElementById('finalChoosePatient')
const finalText = document.getElementById('finalText')
invisible_button_final_patient.style.pointerEvents = 'none'
invisible_button_final_doctor.style.pointerEvents = 'none'

function mirrorFinal() {
  mirrorFinalStage++

  if (mirrorFinalStage === 1) {
    setTimeout(() => {
      playSound(heartbeat)
      roomContainer.classList.add('flash1')
    }, 500)
    setTimeout(() => {
      roomContainer.classList.remove('flash1')
    }, 850) // 200 + 350
  } else if (mirrorFinalStage === 2) {
    setTimeout(() => {
      playSound(heartbeat)
      roomContainer.classList.add('flash2')
    }, 150)

    setTimeout(() => {
      roomContainer.classList.remove('flash2')
    }, 750)
  } else {
    playSound(heartbeat2)
    roomContainer.classList.add('flash3')

    setTimeout(() => {
      Fourth_scene_room.style.display = 'none'

      final_Scene.style.display = 'flex'

      finalChooseBG.style.display = 'block'

      patientHighlight.style.display = 'block'
      doctorHighlight.style.display = 'block'

      invisible_button_final_patient.style.display = 'block'
      invisible_button_final_doctor.style.display = 'block'

      invisible_button_final_patient.style.pointerEvents = 'none'
      invisible_button_final_doctor.style.pointerEvents = 'none'

      finalText.style.display = 'block'

      requestAnimationFrame(() => {
        finalText.classList.add('appear')
      })
      setTimeout(() => {
        finalText.classList.remove('appear')
        finalText.classList.add('move')

        finalChooseBG.style.filter = 'brightness(.35)'
      }, 1700)

      setTimeout(() => {
        invisible_button_final_patient.style.pointerEvents = 'auto'
        invisible_button_final_doctor.style.pointerEvents = 'auto'
      }, 3200)
    }, 1800)
  }
}

const patientHighlight = document.getElementById('patientHighlight')
const doctorHighlight = document.getElementById('doctorHighlight')
const patientLabel = document.getElementById('patientLabel')
const doctorLabel = document.getElementById('doctorLabel')
let choose_sound = new Audio('sounds/room/choose_sound.mp3')
choose_sound.volume = 0.3

invisible_button_final_patient.addEventListener('mouseenter', () => {
  patientHighlight.style.opacity = '1'

  patientLabel.classList.add('show')
})

invisible_button_final_patient.addEventListener('mouseleave', () => {
  patientHighlight.style.opacity = '0'

  patientLabel.classList.remove('show')
})

invisible_button_final_doctor.addEventListener('mouseenter', () => {
  doctorHighlight.style.opacity = '1'

  doctorLabel.classList.add('show')
})

invisible_button_final_doctor.addEventListener('mouseleave', () => {
  doctorHighlight.style.opacity = '0'

  doctorLabel.classList.remove('show')
})

invisible_button_final_patient.addEventListener('click', () => {
  playSound(choose_sound)
  resetGame()
})
invisible_button_final_doctor.addEventListener('click', () => {
  playSound(choose_sound)
  introStatusText = 'Stabilized'
  playEndingIntro('Stabilized')
  BGsoundTrack.pause()
})

const radius = 180

const sayItHint = document.getElementById('sayItHint')

function showSayItHint() {
  sayItHint.classList.add('show')

  setTimeout(() => {
    sayItHint.classList.remove('show')
  }, 850)
  sayItHintShown = 0
}

invisible_button_mirror_room.addEventListener('click', function () {
  mirrorOpenCount++
  if (getComputedStyle(mirror).display === 'none' && !trueRoomActive) {
    if (mirrorOpenCount >= 4 && !trueRoomActive) {
      setTimeout(showSayItHint, 1200)
      mirrorOpenCount = 0
    }
    clickedSpaceRoom()
    hideRoomButtons()
    mirror.style.display = 'block'
    mirror.classList.remove('off')
    mirror.classList.add('on')
    mirrorDialogTimeout = setTimeout(() => {
      if (getComputedStyle(mirror).display === 'none') return

      typeText('Which one is me? Which one is real? ... Show me... the truth... SHOW ME THE TRUTH!', 80, false)
    }, 3500)
    archiveOverlay2.classList.add('active')
  } else if (/*countBed &&  countClock && countDiagnos && countNotes &&*/ countRobe) {
    mirrorFinal()
  }
})

function closeMirror() {
  stopTyping = true
  clearTimeout(mirrorDialogTimeout)
  mirrorDialogTimeout = null
  typeSound.pause()
  typeSound.currentTime = 0

  dialogBox.style.display = 'none'

  archiveOverlay2.classList.remove('active')

  doctor.style.display = 'none'

  mirror.classList.remove('on')
  mirror.classList.add('off')
  showRoomButtons()
  setTimeout(() => {
    mirror.style.display = 'none'
  }, 600)
}

const diagnosFalse = document.getElementById('diagnosFalse')
const diagnosTruth = document.getElementById('diagnosTruth')

function clickedSpaceRoom() {
  document.removeEventListener('click', roomClickHandler)

  document.addEventListener('click', roomClickHandler)
  showRoomButtons()
}

function roomClickHandler(event) {
  if (currentScene !== 'room') return
  console.log('6')

  if (
    getComputedStyle(mirror).display !== 'none' &&
    !mirror.contains(event.target) &&
    !invisible_button_mirror_room.contains(event.target)
  ) {
    document.removeEventListener('click', roomClickHandler)
    closeMirror()
    return
  }

  if (
    getComputedStyle(notes).display !== 'none' &&
    !notes.contains(event.target) &&
    !invisible_button_notes.contains(event.target)
  ) {
    archiveOverlay2.classList.remove('active')
    notes.style.display = 'none'
    showRoomButtons()

    document.removeEventListener('click', roomClickHandler)
    return
  }
}

mirror.addEventListener('mousemove', e => {
  doctor.style.display = 'block'

  const rect = mirror.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const mask = `
        radial-gradient(
            circle ${radius}px at ${x}px ${y}px,
            black 0%,
            black 60%,
            rgba(0,0,0,.8) 70%,
            rgba(0,0,0,.5) 80%,
            transparent 100%
        )
    `

  doctor.style.maskImage = mask
  doctor.style.webkitMaskImage = mask
})

const invisible_button_diagnos_room = document.getElementById('invisible_button_diagnos_room')
const invisible_button_diagnos_back = document.getElementById('invisible_button_diagnos_back')
const notes = document.getElementById('notes')
const invisible_button_notes = document.getElementById('invisible_button_notes')
const invisible_button_bed = document.getElementById('invisible_button_bed')
let patient217Sound_bed = new Audio('sounds/room/patient217_1.mp3')
patient217Sound_bed.volume = 0.05
const invisible_button_robe = document.getElementById('invisible_button_robe')
const invisible_button_clock = document.getElementById('invisible_button_clock')

let countBed = false,
  countNotes = false,
  countMirror = false,
  countRobe = false,
  countClock = false,
  countDiagnos = false

function hideRoomButtons() {
  invisible_button_mirror_room.style.display = 'none'
  invisible_button_diagnos_room.style.display = 'none'
  invisible_button_notes.style.display = 'none'
  invisible_button_bed.style.display = 'none'
  invisible_button_robe.style.display = 'none'
  invisible_button_clock.style.display = 'none'
}

function showRoomButtons() {
  invisible_button_mirror_room.style.display = 'block'
  invisible_button_diagnos_room.style.display = 'block'

  if (trueRoomActive) {
    invisible_button_notes.style.display = 'block'
    invisible_button_robe.style.display = 'block'
    invisible_button_clock.style.display = 'block'
    if (!countBed) {
      invisible_button_bed.style.display = 'block'
    }
  }
}

function buttoDiagnosBack(scene_room, scene_diagnos) {
  console.log('2')
  invisible_button_diagnos_back.addEventListener('click', function () {
    console.log('3')
    if (getComputedStyle(scene_room).display === 'none') {
      console.log('4')
      showRoomButtons()
      invisible_button_diagnos_back.style.display = 'none'
      switchSceneCorridor(scene_diagnos, scene_room, 'room')
    }
  })
}

invisible_button_diagnos_room.addEventListener('click', function () {
  countDiagnos = true
  if (!trueRoomActive) {
    console.log('1')
    hideRoomButtons()
    invisible_button_diagnos_back.style.display = 'block'
    switchSceneCorridor(false_room, diagnosFalse, 'room')
    buttoDiagnosBack(false_room, diagnosFalse)
  } else if (trueRoomActive) {
    console.log('5')
    hideRoomButtons()
    invisible_button_diagnos_back.style.display = 'block'
    switchSceneCorridor(true_room, diagnosTruth, 'room')
    buttoDiagnosBack(true_room, diagnosTruth)
  }
})

invisible_button_notes.addEventListener('click', function () {
  countNotes = true
  if (getComputedStyle(notes).display === 'none') {
    clickedSpaceRoom()
    playSound(paperSound)
    archiveOverlay2.classList.add('active')
    notes.style.display = 'block'
    hideRoomButtons()
  } else {
    archiveOverlay2.classList.remove('active')
    notes.style.display = 'none'
    showRoomButtons()
  }
})

invisible_button_bed.addEventListener('click', function () {
  countBed = true
  archiveOverlay2.style.background = 'rgba(0, 0, 0, 0.63)'
  archiveOverlay2.classList.add('active')
  setTimeout(() => {
    hideRoomButtons()
    BGsoundTrack.pause()
    playSound(patient217Sound_bed)
  }, 800)
  setTimeout(() => {
    archiveOverlay2.classList.remove('active')
    BGsoundTrack.play()
    showRoomButtons()
  }, 37800)
  setTimeout(() => {
    archiveOverlay2.style.background = 'rgba(0, 0, 0, 0.512);'
  }, 38400)
})

function showCenterText(element) {
  archiveOverlay2.classList.add('active')

  element.classList.add('show')

  setTimeout(() => {
    element.classList.remove('show')
    archiveOverlay2.classList.remove('active')
    showRoomButtons()
  }, 2200)
}

invisible_button_clock.onclick = () => {
  countClock = true
  hideRoomButtons()
  showCenterText(clockText)
}

let soundSmellRobe = new Audio('sounds/room/soundSmellRobe.mp3')
soundSmellRobe.volume = 0.1

invisible_button_robe.onclick = () => {
  countRobe = true
  playSound(soundSmellRobe)
  hideRoomButtons()
  showCenterText(robeText)
}

function resetGame() {
  // ---------- Intro ----------
  introStatusText = 'Unknown'

  // ---------- Scene ----------
  currentScene = ' '
  trueRoomActive = false
  typed = ''

  // ---------- Mirror ----------
  mirrorFinalStage = 0
  mirrorOpenCount = 0
  sayItHintShown = false
  countDialogMirror = false

  // ---------- Room ----------
  countBed = false
  countNotes = false
  countMirror = false
  countRobe = false
  countClock = false
  countDiagnos = false

  // ---------- Corridor ----------
  count = 0

  // ---------- Archive ----------
  paperTouched = false
  sequencePlayed = false
  clearTimeout(sequenceTimeout)

  // ---------- Dialog ----------
  stopTyping = false
  clearTimeout(mirrorDialogTimeout)

  // ---------- Sounds ----------
  heartbeat.pause()
  heartbeat.currentTime = 0

  heartbeat2.pause()
  heartbeat2.currentTime = 0

  footsteps.pause()
  footsteps.currentTime = 0

  BGsoundTrack.pause()
  BGsoundTrack.currentTime = 0

  // ---------- Intro ----------
  intro.style.display = 'flex'
  intro.classList.remove('off')

  introTitle.textContent = ''
  introStatus.textContent = ''

  // ---------- Hide scenes ----------
  final_Scene.style.display = 'none'
  Fourth_scene_room.style.display = 'none'
  Third_scene_corridor.style.display = 'none'
  Second_scene_archive.style.display = 'none'
  First_scene_lobby.style.display = 'none'

  archiveDarkBG.style.display = 'none'
  scene_corridor1.style.display = 'block'
  scene_corridor2.style.display = 'none'
  scene_corridor3.style.display = 'none'
  invisibleButtonCorridorDoor.style.display = 'block'
  diagnosFalse.style.display = 'none'
  diagnosTruth.style.display = 'none'
  finalChooseBG.style.display = 'none'
  patientHighlight.style.display = 'none'
  doctorHighlight.style.display = 'none'
  invisible_button_final_patient.style.display = 'none'
  invisible_button_final_doctor.style.display = 'none'
  inputFields.style.display = 'none'
  invisible_button_diagnos_back.style.display = 'none'
  invisible_button_notes.style.display = 'none'
  invisible_button_bed.style.display = 'none'
  invisible_button_clock.style.display = 'none'
  invisible_button_robe.style.display = 'none'
  paper.style.display = 'none'
  main_screen_windows.style.display = 'none'
  screen_papki.style.display = 'none'
  invisible_button_windows_papka.style.display = 'none'
  xp_login.style.display = 'none'
  mirror.style.display = 'none'
  doctor.style.display = 'none'
  notes.style.display = 'none'
  dialogBox.style.display = 'none'

  usernameInput.value = ''
  passwordInput.value = ''
  password_archive.value = ''
  true_room.style.opacity = '0'
  invisible_button_diagnos_room.style.top = '85%'
  document.addEventListener('keydown', keyHandler)
  roomContainer.classList.remove('flash1')
  roomContainer.classList.remove('flash2')
  roomContainer.classList.remove('flash3')

  finalText.classList.remove('appear')
  finalText.classList.remove('move')

  finalChooseBG.style.filter = 'brightness(.15)'

  patientHighlight.style.opacity = '0'
  doctorHighlight.style.opacity = '0'

  patientLabel.classList.remove('show')
  doctorLabel.classList.remove('show')

  mirror.classList.remove('on', 'off')

  xp_login.classList.remove('on', 'off')

  First_scene_lobby.classList.remove('active')

  archiveOverlay.classList.remove('active')
  archiveOverlay2.classList.remove('active')

  invisibleButtonArchiveComputer.style.display = 'block'

  dialog.textContent = ''

  nextArrow.style.display = 'none'
  introAnimation(false)
}
