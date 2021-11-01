// DisTube example bot, definitions, properties and events details in the Documentation page.
const Discord = require('discord.js'),
    DisTube = require('distube'),
    client = new Discord.Client(),
    config = {
        prefix: "------- PREFIX ---------",
        token: process.env.TOKEN || "-------- TOKEN ----------"
    };

// Create a new DisTube
const distube = new DisTube(client, { 
     highWaterMark : 1<<25,
     searchSongs: false,
     emitNewSongOnly: true,
     leaveOnEmpty: false,
     emptyCooldown: 0,
     leaveOnFinish: false,
     leaveOnStop: false,
     nsfw : true,
     youtubeDL : true,
     updateYouTubeDL : true
    });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`##################################`);
    console.log(`#### STATUS : ONLINE`);
    console.log(`#### SERVER : READY`);
    console.log(`#### LOAD : MUSIC , MOD , ADMIN , DISCORD`);
    console.log(`#### TYPE : DISCORD MUSIC BOT`);
    console.log(`#### TYPE : DISCORD MUSIC BOT`);
    console.log(`#### TYPE : DISCORD MUSIC BOT`);
    console.log(`#### TYPE : DISCORD MUSIC BOT`);
    console.log(`#### TYPE : DISCORD MUSIC BOT`);
});


client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)){
        return;
    } else{
        message.delete()
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();




    if (command == "play" || command == "p"){
        if(!message.member.voice.channel){
            const no_join = new Discord.MessageEmbed()
                .setColor(`#000000`)
                .setAuthor(`Warning`, message.client.user.displayAvatarURL())
                .setDescription("Please Join the voice Channel!!!")
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
            return message.channel.send(no_join)
        }

        distube.play(message, args.join(" "))
    }

    if (command == "loop") {
        if(!message.member.voice.channel){
            const no_join = new Discord.MessageEmbed()
                .setColor(`#000000`)
                .setAuthor(`Warning`, message.client.user.displayAvatarURL())
                .setDescription("Please Join the voice Channel!!!")
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
            return message.channel.send(no_join)
        }

        let mode = distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        const loop = new Discord.MessageEmbed()
            .setColor(`#23FF00`)
            .setAuthor(`Loop Mode`, message.client.user.displayAvatarURL())
            .setDescription(":arrows_counterclockwise: Set repeat mode to `" + mode + "`")
            .setFooter(`Setting by ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(loop)
    }

    if (command == "stop") {
        if(!message.member.voice.channel){
            const no_join = new Discord.MessageEmbed()
                .setColor(`#000000`)
                .setAuthor(`Warning`, message.client.user.displayAvatarURL())
                .setDescription("Please Join the voice Channel!!!")
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
            return message.channel.send(no_join)
        }

        const stop = new Discord.MessageEmbed()
            .setColor(`#FF0000`)
            .setAuthor(`Stop Music`, message.client.user.displayAvatarURL())
            .setDescription(`:no_entry_sign: Stopped the music!`)
            .setFooter(`Stopped by ${message.author.tag}`, message.author.displayAvatarURL())
        distube.stop(message);
        message.channel.send(stop);
    }


    if (command == "skip"){
        if(!message.member.voice.channel){
            const no_join = new Discord.MessageEmbed()
                .setColor(`#000000`)
                .setAuthor(`Warning`, message.client.user.displayAvatarURL())
                .setDescription("Please Join the voice Channel!!!")
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
            return message.channel.send(no_join)
        }

        const skip = new Discord.MessageEmbed()
            .setColor(`#FBFF00`)
            .setAuthor(`Skip Music`, message.client.user.displayAvatarURL())
            .setDescription(`:fast_forward: Skip the music!`)
            .setFooter(`Skipped by ${message.author.tag}`, message.author.displayAvatarURL())
        distube.skip(message)
        message.channel.send(skip)
    }

        
    if (command == "queue" || command == "q") {
        const queue = distube.getQueue(message)
		if (!queue) {
            const no_queue = new Discord.MessageEmbed()
            .setColor(`#FF0000`)
            .setAuthor(`Queue List`, message.client.user.displayAvatarURL())
            .setDescription(`Nothing playing right now!`)
			message.channel.send(no_queue)
		} else {
            const have_queue = new Discord.MessageEmbed()
            .setColor(`#FF0000`)
            .setAuthor(`Queue List`, message.client.user.displayAvatarURL())
            .setDescription(`${queue.songs.map((song, id) =>`**${id ? id : ':headphones: Playing'}**. ${song.name} - \`${song.formattedDuration}\``,).slice(0, 15).join('\n')}`,)
			message.channel.send(have_queue)
		}
    }

    if (command == "autoplay" || command == "auto") {
        if(!message.member.voice.channel){
            const no_join = new Discord.MessageEmbed()
                .setColor(`#000000`)
                .setAuthor(`Warning`, message.client.user.displayAvatarURL())
                .setDescription("Please Join the voice Channel!!!")
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
            return message.channel.send(no_join)
        }

        let mode = distube.toggleAutoplay(message);
        const autoplay = new Discord.MessageEmbed()
            .setColor(`#2CFF22`)
            .setAuthor(`Autoplay Mode`, message.client.user.displayAvatarURL())
            .setDescription(":radio: Set autoplay mode to `" + (mode ? "On" : "Off") + "`")
            .setFooter(`Setting by ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(autoplay);
    }

    if (command == "help"){
        const help = new Discord.MessageEmbed()
            .setColor(`#FF0000`)
            .setAuthor(`Help Command`, message.client.user.displayAvatarURL())
            .setThumbnail(message.client.user.displayAvatarURL())
            .addField(`!!help`, `Show the help command`)
            .addField(`!!about`, `Show about this bot\n\n`)
            .addField(`--->> MUSIC COMMAND <<---`,`:dvd: :dvd: :dvd: `)
            .addField(`!!p    !!play`, `Play the music and playlist`)
            .addField(`!!skip`, `Skip the music`)
            .addField(`!!stop`, `Stop the music`)
            .addField(`!!loop`, `Loop music queue\n\`Repeat Song\` | \`Repeat Queue\` | \`No Repeat\``)
            .addField(`!!queue    !!q`, `Show Queue list`)
            .addField(`!!autoplay    !!auto`, `Autoplay the music`)
        message.channel.send(help)
    }

});

///////////////////////////////////////// EMBED EXAMPLE ///////////////////////////////


//const embed = new Discord.MessageEmbed()
//            .setTitle('This is a test Embed.')
//            .setURL('https://example.com')
//            .setAuthor('example')
//            .setDescription('This is a test Description which we will see.')
//            .setColor('#FF2D00')
//            .setThumbnail('https://example.png')
//            .setImage('https://example.png')
//            .setFooter('This is a example footer', 'https://example.png')
//          message.channel.send(embed);


//////////////////////////////////////////////////////////////////////////////////////

// Queue status template


//const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
//${status(queue)}

// DisTube event listeners, more in the documentation page


distube


    .on("playSong", (message,song) =>{
        const playing = new Discord.MessageEmbed()
            .setColor(`#00F0FF`)
            .setAuthor(`Now Playing`, message.client.user.displayAvatarURL())
            .setDescription(`:headphones: Playing \`${song.name}\`\nDuration : \`${song.formattedDuration}\``)
            .setThumbnail(`${song.thumbnail}`)
            .setFooter(`Requested by ${song.user.username}`, song.user.displayAvatarURL())
        message.channel.send(playing)
    })


    .on("addSong", (message,song) => {
        const addsong = new Discord.MessageEmbed()
            .setColor(`#AC25E2`)
            .setAuthor(`Add Song`, message.client.user.displayAvatarURL())
            .setDescription(`Added \`${song.name}\`\nDuration : \`${song.formattedDuration}\``)
            .setThumbnail(`${song.thumbnail}`)
            .setFooter(`Added by ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(addsong)
    })


    .on("playList", (message, queue, playlist, song) => {
        const showplaylist = new Discord.MessageEmbed()
            .setColor(`#FE3D13`)
            .setAuthor(`Playlist`, message.client.user.displayAvatarURL())
            .setDescription(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
        message.channel.send(showplaylist)
    })


    .on("addList", (message, queue, playlist) => {
        const addlist = new Discord.MessageEmbed()
            .setColor(`#FF0051`)
            .setAuthor(`Add Playlist`, message.client.user.displayAvatarURL())
            .setDescription(`Added \`${playlist.name}\` playlist (\`${playlist.songs.length} songs\`) to queue`)
        message.channel.send(addlist)
    })


    // DisTubeOptions.searchSongs = true

    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 100;
    })


    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })


    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => {
        const searchcancel = new Discord.MessageEmbed()
            .setColor(`#FF0000`)
            .setAuthor(`Searching canceled`, message.client.user.displayAvatarURL())
        message.channel.send(searchcancel)
    })
    

    .on("error", (message, e) => {
        const error = new Discord.MessageEmbed()
            .setColor(`#000000`)
            .setAuthor(`Error`, message.client.user.displayAvatarURL())
            .setDescription("An error encountered: " + e)
        message.channel.send(error)
    })
    

client.login(config.token);