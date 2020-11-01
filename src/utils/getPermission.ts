const getPermission1 = message => {
  // ADM
  return message.channel
    .permissionsFor(message.member)
    .has('ADMINISTRATOR', false)
}

const getPermission2 = message => {
  // ADM and MODERADOR
  return message.channel
    .permissionsFor(message.member)
    .has('MANAGE_ROLES', false)
}
export { getPermission1, getPermission2 }
