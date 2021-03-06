import { Client } from '../Client'
import commands from './commands.json'
import Utils from '../Utils'
import responses from './responses.json'
import { ICommandList } from '../Typings'

export const help = (client: Client, command?: string): string => {
    if (command) {
        for (const category in commands) {
            for (const index of (commands as ICommandList)[category]) {
                if (index.command === command) {
                    return `*š Command:* ${index.command}\nš *Description:* ${index.description}\nš *Usage:* ${client._config.prefix}${index.usage}`
                }
            }
        }
        return responses['invalid-command-short'].replace('{C}', command)
    }
    let base = `š¤ ${client._config.name} Command List š¤\n\nš” *Prefix:* ${client._config.prefix}\n\n`
    const cmds = commands as ICommandList
    const cats = Object.keys(cmds)
    for (const cat in cmds) {
        base += `*${Utils.capitalize(cat)}* ${Utils.emojis[cats.indexOf(cat)]}\n\`\`\``
        cmds[cat].forEach((cmd) => {
            base += `${cmd.command}${cmds[cat][cmds[cat].length - 1] === cmd ? '' : ', '}`
        })
        base += '```\n\n'
    }
    return `${base}š Use ${client._config.prefix}help <command_name> to view the full info. \nš _Eg: ${client._config.prefix}help promote_`
}
