export default [
  // RANDOM STUFFS
  {
    name: 'ping',
    group: 'randomstuff',
    desc: 'Check your ping against the server.',
    usage: '!ping',
    example: '!ping',
  },
  {
    name: 'dog',
    group: 'randomstuff',
    desc: 'Find some cute pictures of dogs.',
    usage: '!dog',
    example: '!dog',
  },
  {
    name: 'cat',
    group: 'randomstuff',
    desc: 'Find some cute pictures of cats.',
    usage: '!cat',
    example: '!cat',
  },
  {
    name: 'mamaco',
    group: 'randomstuff',
    desc: 'Find some nice pictures of mamaco.',
    usage: '!mamaco',
    example: '!mamaco',
  },
  {
    name: 'gif',
    group: 'randomstuff',
    desc: 'Displays random gif.',
    usage: '!gif',
    example: '!gif, !gif <example>',
  },
  {
    name: 'avatar',
    group: 'randomstuff',
    desc: 'Displays a card with your avatar.',
    usage: '!avatar',
    example: '!avatar',
  },
  // {
  //   name: 'sextou',
  //   group: 'randomstuff',
  //   desc: 'Exibe uma imagem aleatoria de um sextou diferente.',
  //   usage: '!sextou',
  //   example: '!sextou, !sextou add <url>, !sextou list, !sextou remove <:id>',
  // },
  {
    name: 'red',
    group: 'randomstuff',
    desc: 'Generates a random hexadecimal color with preview.',
    usage: '!red',
    example: '!red',
  },
  // GAMES
  {
    name: 'roll',
    group: 'games',
    desc: 'Dice Roller.',
    usage: '!roll',
    example: '!roll 1d10 ou !roll 1d10, +5',
  },
  {
    name: 'coinflip',
    group: 'games',
    desc: 'flip a coin, heads or tails',
    usage: '!coinflip',
    example: '!coinflip <cara ou coroa>',
  },
  // MUSIC
  {
    name: 'music',
    group: '',
    desc: 'Command for manipulating music on the channel.',
    usage:
      '!music play **[Link]** or !music skip or !music queue or !music stop',
    example: '!music play **[Link]**',
  },
  // INFO
  {
    name: 'server',
    group: 'info',
    desc: 'Shows monkey but usage information.',
    usage: '!info or !info <comando>',
    example: '!info or !info coinflip',
  },
]
