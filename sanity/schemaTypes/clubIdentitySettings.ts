import { defineType } from "sanity";

export const clubIdentitySettingsType = defineType({
  name: "clubIdentitySettings",
  type: "document",
  title: "Club Identity Settings",
  fields: [
    {
      name: "clubName",
      type: "string",
      title: "Club Name",
      initialValue: "Bechem United Football Club",
    },
    {
      name: "nickname",
      type: "string",
      title: "Nickname",
      initialValue: "The Hunters",
    },
    {
      name: "slogan",
      type: "string",
      title: "Slogan",
      initialValue: "Vision With Precision",
    },
    {
      name: "tagline",
      type: "text",
      title: "Tagline",
      initialValue:
        "Pride of Ahafo Region. Follow the Hunters as we compete in the Ghana Premier League and build a legacy of excellence both on and off the pitch.",
    },
    {
      name: "founded",
      type: "number",
      title: "Year Founded",
      initialValue: 1966,
    },
    {
      name: "location",
      type: "string",
      title: "Location",
      initialValue: "Bechem, Ahafo Region",
    },
    {
      name: "colors",
      type: "object",
      title: "Club Colors",
      fields: [
        {
          name: "primary",
          type: "string",
          title: "Primary Color",
          initialValue: "Purple",
        },
        {
          name: "secondary",
          type: "string",
          title: "Secondary Color",
          initialValue: "Yellow",
        },
        {
          name: "description",
          type: "text",
          title: "Colors Description",
          initialValue:
            "We wear our distinctive purple and yellow colors with immense pride, displaying them boldly on the football pitch. These vibrant colors represent our community, our passion, and our unwavering spirit in every match we play",
        },
      ],
    },
    {
      name: "whoWeAre",
      type: "text",
      title: "Who We Are",
      initialValue:
        "Bechem United Football Club is a professional Ghanaian football club based in Bechem, Ahafo Region. We embody the pride and passion of our community, living by our slogan, Vision With Precision, which reflects our commitment to moving forward with purpose and exacting standards.",
    },
    {
      name: "huntersMentality",
      type: "text",
      title: "The Hunters Mentality",
      initialValue:
        "Our nickname The Hunters reflects our aggressive, never-give-up mentality on the pitch. We embody the spirit of determination and excellence that has made us one of Ghana's most respected football institutions.",
    },
    {
      name: "vision",
      type: "text",
      title: "Vision",
      initialValue:
        "To become a dominant force in African football — competing on the continental stage and elevating the pride of our community.",
    },
    {
      name: "mission",
      type: "text",
      title: "Mission",
      initialValue:
        "To build a winning culture grounded in discipline, hard work, and strategic leadership",
    },
    {
      name: "commitment",
      type: "text",
      title: "Commitment",
      initialValue:
        "Develop elite talent, secure long-term excellence, and build lasting legacy for the club",
    },
    {
      name: "historyEras",
      type: "array",
      title: "History Eras",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Era Title",
            },
            {
              name: "period",
              type: "string",
              title: "Period",
            },
            {
              name: "description",
              type: "text",
              title: "Description",
            },
            {
              name: "icon",
              type: "string",
              title: "Icon",
              description: "Iconify icon name (e.g., mdi:seedling)",
            },
            {
              name: "keyAchievements",
              type: "array",
              title: "Key Achievements",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
      initialValue: [
        {
          title: "Club Foundation Era",
          period: "1966 - 2006",
          icon: "mdi:seedling",
          description:
            "Bechem United Football Club was born in 1966 in Bechem, Ahafo Region. Nicknamed The Hunters, we began our journey with a vision to represent our community through passionate, determined football that would unite and inspire our people. \n\nOver four decades, we built our identity in the lower divisions, established fierce rivalries with Brong Ahafo Stars and Berekum Chelsea, and created a loyal fanbase. These foundational years saw us develop the aggressive, never-give-up mentality that defines the Hunters to this day, laying the groundwork for our eventual rise to national prominence.",
          keyAchievements: [],
        },
        {
          title: "International Recognition",
          period: "2007 - 2010",
          icon: "mynaui:globe-solid",
          description:
            "In 2007, our youth team traveled to Italy to compete in the prestigious Trofeo Karol Wojtyla tournament in Fiumicino, Province of Rome, Lazio region. This marked our first international appearance and demonstrated our commitment to youth development on the world stage.\n\nThese years focused on building infrastructure, strengthening our Division One campaigns, and preparing for the historic breakthrough that would come in 2011. We invested in player development, improved our training facilities, and set our sights firmly on Ghana's top flight, knowing that the Hunters belonged among the nation's elite.",
          keyAchievements: [],
        },
        {
          title: "Glory Years",
          period: "2011 - 2017",
          icon: "game-icons:trophy-cup",
          description:
            "September 2011 - Champions of Poly Tank Division One League Zone 1! We earned promotion to the Ghana Premier League, changing our club's trajectory forever. \n\nOn October 10, 2011, Eric Fordjour scored our historic first top-flight goal from the penalty spot against Aduana Stars. Richard Addae became our debut season hero with 11 goals, finishing 3rd in the entire league's scoring charts. \n\nThen came September 2016 at Cape Coast Stadium - our finest moment. Yaw Annor's memorable brace secured a 2-1 victory over Okwawu United, bringing home our first major national trophy, the Ghana FA Cup. \n\nIn 2017, we competed in the Ghana Super Cup final as runners-up, cementing our status among the nation's elite. From promoted club to national champions in just five years - this was the era that defined modern Bechem United.",
          keyAchievements: [
            "Poly Tank Division One Zone 1 Champions (2010-11)",
            "Ghana FA Cup Winners (2016)",
            "Ghana Super Cup Runners-Up (2017)",
          ],
        },
        {
          title: "Consolidation & Growth",
          period: "2018 - 2022",
          icon: "fluent:arrow-growth-24-filled",
          description:
            "A period of stability, strong leadership, and consistent Premier League competition. We were blessed with exceptional captains who embodied the Hunter spirit: Asante Agyemang (2017-2018), Daniel Egyin (2018-2019), Prince Asempa (2019-2020), and Moro Salifu (2020-2021), who later earned a move to Al Ittihad of Egypt - proving Bechem United is a pathway to international careers. \n\nWe attracted world-class coaching talent including Mohammed Adil Erradi (2015-2016), the mastermind behind our FA Cup triumph, and Romain Folz (2020), who brought European coaching methods and elevated our tactical approach to new professional standards. \n\nThese years established us as consistent competitors, focused on player development, and built the foundation for sustained success at the highest level of Ghanaian football.",
          keyAchievements: [],
        },
      ],
    },
  ],
});
