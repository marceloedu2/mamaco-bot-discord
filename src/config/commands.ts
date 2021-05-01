export default [
  // RANDOM STUFFS
  {
    name: 'ping',
    group: 'randomstuff',
    desc: 'Faça ping no bot',
    usage: '!ping',
    example: '!ping',
  },
  {
    name: 'dog',
    group: 'randomstuff',
    desc: 'Encontre algumas fotos fofas de cachorros',
    usage: '!dog',
    example: '!dog',
  },
  {
    name: 'cat',
    group: 'randomstuff',
    desc: 'Exibe uma imagem aleatoria de um gato diferente.',
    usage: '!cat',
    example: '!cat',
  },
  {
    name: 'mamaco',
    group: 'randomstuff',
    desc: 'Encontre algumas fotos bonitas do mamaco',
    usage: '!mamaco',
    example: '!mamaco',
  },
  {
    name: 'gif',
    group: 'randomstuff',
    desc: 'Exibe gif aleatório.',
    usage: '!gif',
    example: '!gif, !gif <exemplo>',
  },
  {
    name: 'avatar',
    group: 'randomstuff',
    desc: 'Exibe um card com o seu avatar.',
    usage: '!avatar',
    example: '!avatar',
  },
  {
    name: 'sextou',
    group: 'randomstuff',
    desc: 'Exibe uma imagem aleatoria de um sextou diferente.',
    usage: '!sextou',
    example: '!sextou, !sextou add <url>, !sextou list, !sextou remove <:id>',
  },
  {
    name: 'red',
    group: 'randomstuff',
    desc: 'Gera uma cor hexadecimal aleatória com visualização',
    usage: '!red',
    example: '!red',
  },
  // GAMES
  {
    name: 'roll',
    group: 'games',
    desc: 'Rolador de dados aleatório.',
    usage: '!roll',
    example: '!roll 1d10 ou !roll 1d10, +5',
  },
  {
    name: 'coinflip',
    group: 'games',
    desc: 'Jogar uma moeda, Cara ou coroa',
    usage: '!coinflip',
    example: '!coinflip <cara ou coroa>',
  },
  // INFO

  {
    name: 'info',
    group: 'info',
    desc:
      'Mostra a lista de comandos se apenas escrever !help ou se escrever !help <comando> mostra a informação do comando atual.',
    usage: '!info or !info <comando>',
    example: '!info or !info coinflip',
  },
]
