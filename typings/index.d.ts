declare module 'VenomBot' {
  import type { VenomClient } from '../src/structures/Client';
  import type { Guild, GuildMember, Message, PermissionString, Snowflake, TextChannel } from 'discord.js';

  type CommandCategory = 'Fun'
    | 'Miscellaneous'
    | 'Staff'
    | 'Tickets';

  interface Command {
    clientPerms: PermissionString[];
    help: HelpObj;
    memberPerms: PermissionString[];
    run: (client: VenomClient, message: Message, args: string[]) => void;
  }

  interface GuildMessage extends Message {
    channel: TextChannel;
    guild: Guild;
    member: GuildMember;
  }

  interface HelpObj {
    aliases: string[];
    category: CommandCategory;
    desc: string;
    private?: boolean;
    usage: string;
    venom?: boolean;
  }

  interface RowRep {
    active: boolean;
    by: Snowflake;
    time: string;
    userid: Snowflake;
    val: number;
  }
}
