# BUFC Website - Sanity CMS Documentation

This document provides a comprehensive guide to all content types (schemas) and their fields in the Bechem United FC website Sanity CMS.

---

## Table of Contents

1. [News Articles](#news-articles)
2. [Store Products](#store-products)
3. [Player Information](#player-information)
4. [Match Fixtures](#match-fixtures)
5. [Match Highlights](#match-highlights)
6. [Gallery Images](#gallery-images)
7. [Ghana Premier League Clubs](#ghana-premier-league-clubs)
8. [Competitions](#competitions)
9. [Staff Members](#staff-members)
10. [Club Identity](#club-identity)
11. [Trophy Cabinet](#trophy-cabinet)
12. [Wall of Fame](#wall-of-fame)
13. [Record Breakers](#record-breakers)
14. [Club History](#club-history)
15. [Facilities](#facilities)
16. [Page Settings](#page-settings)

---

## News Articles

Manage all news content including club updates, player news, match reports, and transfer announcements.

### Fields

#### **Title** _(Required)_

- Type: Text
- Description: Main headline of the news article
- Example: "Bechem United Advances to Quarter Finals"

#### **Slug** _(Auto-generated, Required)_

- Type: URL Slug
- Description: Automatically generated from title for the article URL
- Example: "bechem-united-advances-to-quarter-finals"

#### **Excerpt** _(Optional)_

- Type: Text Area
- Description: Brief summary of the article (2-3 sentences)
- Example: "Bechem United secured a crucial victory in yesterday's match, advancing to the quarter finals of the FA Cup. The Hunters dominated the game with exceptional teamwork and strategy."

#### **Featured Image** _(Optional)_

- Type: Image Upload
- Description: Main image displayed with the article
- Recommended Size: 1200x675px
- Format: JPG, PNG

#### **Content** _(Optional)_

- Type: Rich Text Editor
- Description: Full article content with formatting support
- Supports: Bold, italics, headings, bullet points, numbered lists

#### **Author** _(Optional)_

- Type: Text
- Description: Name of the person or source who wrote/published the article
- Example: "BUFC Media Team" or "John Doe"

#### **Read Time** _(Optional)_

- Type: Number
- Description: Estimated reading time in minutes
- Example: 5 (for 5 minutes)

#### **Published Date** _(Auto-filled, Required)_

- Type: Date & Time
- Description: When the article was published
- Default: Current date and time

#### **Category** _(Required)_

- Type: Select Dropdown
- Description: Type of news article
- Options:
  - **Club News** - General club announcements and updates
  - **Player News** - Individual player stories and achievements
  - **Transfer News** - Player signings, departures, and transfer rumors
  - **Match Report** - Post-match analysis and summaries

#### **Is Featured?** _(Optional)_

- Type: True/False Toggle
- Description: Mark article as featured to display prominently on homepage and news page
- **⚠️ Important**: Only 4 articles can be featured at once. You must unfeature an existing article before featuring a new one.
- Default: False

---

## Store Products

Manage all shop items including jerseys, lifestyle wear, and accessories.

### Fields

#### **Product Name** _(Required)_

- Type: Text
- Description: Full name of the product
- Example: "Neon Green 2025/26 Home Jersey"

#### **Slug** _(Auto-generated)_

- Type: URL Slug
- Description: Automatically generated from product name for the URL
- Example: "neon-green-2025-26-home-jersey"

#### **Primary Image** _(Optional)_

- Type: Image Upload
- Description: Main product image
- Recommended Size: 800x800px
- Format: JPG, PNG with transparent background preferred

#### **Other Images** _(Optional)_

- Type: Multiple Image Upload
- Description: Additional product photos (different angles, details, worn)
- Maximum: 4 images
- Recommended Size: 800x800px each

#### **Price (GH₵)** _(Required)_

- Type: Number
- Description: Product price in Ghana Cedis
- Example: 250.00

#### **Description** _(Optional)_

- Type: Text Area
- Description: Detailed product description
- Example: "Official neon green FC home jersey for the 2025/26 season. Features the classic green and yellow colorway with club crest. Lightweight, breathable fabric designed for match day performance."

#### **Available Sizes** _(Optional)_

- Type: Multiple Select
- Description: Sizes currently in stock
- Options: S, M, L, XL, 2XL
- Can select multiple

#### **In Stock Status** _(Required)_

- Type: True/False Toggle
- Description: Whether product is currently available for purchase
- Default: True

#### **Category** _(Optional)_

- Type: Select Dropdown
- Description: Product category for organization
- Options:
  - **Jerseys & Kits** - Official match wear and training gear
  - **Lifestyle & Casual** - Casual wear for fans
  - **Accessories** - Small items like scarves, caps, etc.

#### **Product Type** _(Optional, shows only for Jerseys)_

- Type: Select Dropdown
- Description: Specific type of jersey for homepage display
- Options:
  - Home Jersey
  - Away Jersey
  - Training Kit
  - Other
- Note: This field only appears if Category is "Jerseys & Kits"

#### **Display Title** _(Optional)_

- Type: Text
- Description: Short title for product cards (e.g., "Home Jersey"). If empty, uses full product name
- Example: "Home Jersey"

---

## Player Information

Complete player profiles including personal details, statistics, and career history.

### Fields

#### **Full Name** _(Required)_

- Type: Text
- Description: Player's complete name
- Example: "Aminu Mohammed Jnr"

#### **Jersey Number** _(Required)_

- Type: Number
- Description: Player's squad number
- Range: 1-99
- Example: 10

#### **Position** _(Required)_

- Type: Select Dropdown
- Description: Primary playing position
- Options:
  - **Goalkeeper** - Goal keeper position
  - **Defender** - Defensive positions
  - **Midfielder** - Midfield positions
  - **Forward** - Attacking positions

#### **Position Detail** _(Optional)_

- Type: Text
- Description: Specific position detail
- Example: "Center-Back", "Left Winger", "Attacking Midfielder", "Striker"

#### **Player Photo** _(Optional)_

- Type: Image Upload
- Description: Player's profile photo (used on players page grid)
- Recommended: Portrait orientation, 400x533px
- Format: JPG, PNG

#### **Player Photo Banner** _(Optional)_

- Type: Image Upload
- Description: Wide banner photo for player's detail page
- Recommended: Landscape orientation, 1920x600px
- Format: JPG, PNG

#### **Biography** _(Optional)_

- Type: Text Area (5 rows)
- Description: Player's background story and career highlights
- Example: "Aminu Mohammed Jnr is a talented and dynamic professional footballer known for his exceptional skill, determination, and tactical intelligence on the field. Aminu developed a passion for football at an early age and quickly rose through the ranks of local academies..."

#### **Date of Birth** _(Required)_

- Type: Date
- Description: Player's birth date
- Format: YYYY-MM-DD

#### **Nationality** _(Required)_

- Type: Text
- Description: Player's nationality
- Example: "Ghanaian", "Nigerian", "French"

#### **Height (m)** _(Optional)_

- Type: Number (Decimal)
- Description: Player's height in meters
- Example: 1.82

#### **Strong Foot** _(Optional)_

- Type: Select Dropdown
- Description: Preferred foot for playing
- Options: Left, Right, Both

### Social Media _(Optional)_

#### **Facebook URL**

- Type: URL
- Description: Link to player's Facebook profile
- Example: "https://facebook.com/aminomohammed"

#### **Instagram URL**

- Type: URL
- Description: Link to player's Instagram profile
- Example: "https://instagram.com/aminomohammed"

#### **Twitter URL**

- Type: URL
- Description: Link to player's Twitter/X profile
- Example: "https://twitter.com/aminomohammed"

#### **TikTok URL**

- Type: URL
- Description: Link to player's TikTok profile
- Example: "https://tiktok.com/@aminomohammed"

### Statistics

#### **Common Statistics** _(For all players)_

- **Matches Played**: Total appearances
- **Goals Scored**: Total goals
- **Assists**: Total assists provided
- **Minutes Played**: Total playing time
- **Speed in 30 Meters**: Sprint speed measurement
- **Yellow Cards**: Total yellow cards received
- **Red Cards**: Total red cards received

#### **Goalkeeper Statistics** _(Only for Goalkeepers)_

Shows only when Position = "Goalkeeper"

- **Clean Sheets**: Matches without conceding a goal
- **Saves**: Total saves made
- **Goals Conceded**: Total goals allowed

#### **Defender Statistics** _(Only for Defenders)_

Shows only when Position = "Defender"

- **Tackles & Interceptions**: Defensive actions
- **Blocks**: Shots blocked
- **Clearances**: Balls cleared from danger

#### **Midfielder Statistics** _(Only for Midfielders)_

Shows only when Position = "Midfielder"

- **Shots on Target**: Accurate shots
- **Tackles & Interceptions**: Defensive actions
- **Successful Dribbles**: Completed dribbles

#### **Forward Statistics** _(Only for Forwards)_

Shows only when Position = "Forward"

- **Shots on Target**: Accurate shots
- **Tackles & Interceptions**: Defensive actions
- **Successful Dribbles**: Completed dribbles

### Professional Career _(Array - Multiple Entries Allowed)_

Each career entry includes:

#### **Is this a Ghana Premier League Club?** _(Required)_

- Type: True/False Toggle
- Description: Select if the club is in the GPL database
- Default: True

#### **Select GPL Club** _(Conditional)_

- Type: Reference/Dropdown
- Description: Choose from existing GPL clubs in database
- Shows only if: "Is GPL Club" = True

#### **Club Name** _(Conditional)_

- Type: Text
- Description: Enter custom club name
- Shows only if: "Is GPL Club" = False
- Example: "Manchester United", "Real Madrid"

#### **Upload Club Logo** _(Conditional)_

- Type: Image Upload
- Description: Upload club's logo
- Shows only if: "Is GPL Club" = False
- Recommended Size: 200x200px

#### **Role/Position** _(Optional)_

- Type: Select Dropdown
- Description: Position at that club
- Options: Goalkeeper, Defender, Midfielder, Forward

#### **Start Year** _(Optional)_

- Type: Number
- Description: Year player joined the club
- Example: 2020

#### **End Year** _(Optional)_

- Type: Number
- Description: Year player left the club (leave empty if current)
- Example: 2023

#### **Current Club** _(Optional)_

- Type: True/False Toggle
- Description: Is this the player's current club?
- Default: False

#### **Achievements** _(Optional)_

- Type: Array of Texts
- Description: Notable achievements at this club
- Example: "Golden Boot (15 goals), 2020", "Team Captain, 2021-2022"

---

## Match Fixtures

Manage upcoming matches and completed match results.

### Fields

#### **Competition** _(Required)_

- Type: Text
- Description: Name of the competition
- Example: "Ghana Premier League", "MTN FA Cup", "CAF Champions League"

#### **Matchday** _(Optional)_

- Type: Text
- Description: Match week or round number
- Example: "Matchday 13", "Round of 16", "Quarter Finals"

#### **Home Team** _(Required)_

- Type: Text
- Description: Name of the home team
- Example: "Bechem United FC"

#### **Away Team** _(Required)_

- Type: Text
- Description: Name of the away team
- Example: "Asante Kotoko SC"

#### **Match Date & Time** _(Required)_

- Type: Date & Time
- Description: When the match is scheduled or was played
- Format: Full date and time with timezone

#### **Venue** _(Optional)_

- Type: Text
- Description: Stadium or location where match is/was played
- Example: "Nana Fosu Gyeabour Park, Bechem"

#### **Match Status** _(Required)_

- Type: Select Dropdown
- Description: Current status of the match
- Options:
  - **Upcoming** - Match not yet played
  - **Live** - Match currently in progress
  - **Finished** - Match completed
  - **Postponed** - Match delayed to another date
  - **Cancelled** - Match called off
- Default: Upcoming

#### **Home Score** _(Conditional)_

- Type: Number
- Description: Goals scored by home team
- Shows only if: Status is NOT "Upcoming"
- Example: 2

#### **Away Score** _(Conditional)_

- Type: Number
- Description: Goals scored by away team
- Shows only if: Status is NOT "Upcoming"
- Example: 1

#### **Goal Scorers** _(Conditional, Array)_

Shows only if: Status is NOT "Upcoming"

Each goal scorer entry includes:

- **Player Name**: Name of the player who scored
- **Minute**: Time when goal was scored (e.g., "23'", "45+2'")
- **Team**: Home or Away

#### **Ticket Purchase URL** _(Optional)_

- Type: URL
- Description: Link to buy tickets for the match
- Example: "https://tickets.bechemunited.com/match-12"

#### **Highlight Video** _(Conditional)_

- Type: Reference
- Description: Link to associated match highlight video
- Shows only if: Status is NOT "Upcoming"
- Links to: Match Highlight document

---

## Match Highlights

Video highlights from matches and individual player performances.

### Fields

#### **Video URL** _(Required)_

- Type: URL
- Description: YouTube, Vimeo, or other platform video link
- Example: "https://youtube.com/watch?v=abc123"
- **Special Feature**: Can auto-fetch video details from YouTube

#### **Video Title** _(Required)_

- Type: Text
- Description: Title of the video
- Note: Auto-filled from YouTube when using "Fetch YouTube Data" button
- Example: "Bechem United vs Kotoko - Full Highlights | GPL MD13"

#### **Description** _(Optional)_

- Type: Text Area
- Description: Video description or summary
- Note: Auto-filled from YouTube or enter manually

#### **Competition** _(Required)_

- Type: Reference/Dropdown
- Description: Select which competition the match belongs to
- Links to: Competition document
- Example: "Ghana Premier League", "MTN FA Cup"

#### **Matchday** _(Optional)_

- Type: Text
- Description: Match week or round
- Example: "Matchday 13", "Round 16"

#### **Video Type** _(Optional)_

- Type: Select Dropdown
- Description: Type of highlight video
- Options:
  - **Match Highlight** - Full match highlights
  - **Player Highlight** - Individual player performance

#### **Thumbnail** _(Optional)_

- Type: Image Upload
- Description: Custom thumbnail image for the video
- Note: If not provided, YouTube thumbnail will be used
- Recommended Size: 1280x720px

#### **YouTube Thumbnail URL** _(Auto-filled, Read-only)_

- Type: URL
- Description: Automatically fetched from YouTube API
- Note: Used if no custom thumbnail is uploaded

#### **Published At** _(Optional)_

- Type: Date & Time
- Description: When the video was published
- Note: Auto-filled from YouTube or enter manually

#### **Channel** _(Optional)_

- Type: Text
- Description: Channel name from video platform
- Note: Auto-filled from YouTube
- Example: "@BUFC-TV"

#### **Related Player** _(Conditional)_

- Type: Reference/Dropdown
- Description: Player featured in the highlight
- Shows only if: Video Type = "Player Highlight"
- Links to: Player document

### Special Features

- **Fetch YouTube Data Button**: Automatically populates Title, Description, Thumbnail URL, Published Date, and Channel from YouTube API

---

## Gallery Images

Photo gallery management for match day photos, team pictures, and club moments.

### Fields

#### **Image Title/Caption** _(Required)_

- Type: Text
- Description: Descriptive title for the image
- Example: "FA Cup Victory Celebration 2024"

#### **Image** _(Required)_

- Type: Image Upload
- Description: The photo to upload
- Recommended Size: 1920x1080px (landscape) or 1080x1350px (portrait)
- Format: JPG, PNG

#### **Alt Text** _(Required)_

- Type: Text
- Description: Description for accessibility and SEO
- Example: "Players celebrating with FA Cup trophy at Nana Fosu Gyeabour Park"

#### **Upload/Event Date** _(Required)_

- Type: Date & Time
- Description: When the photo was taken or the event occurred
- Default: Current date and time

#### **Category** _(Required)_

- Type: Select Dropdown
- Description: Type of photo for organization
- Options:
  - **Match Day** - Photos from match events
  - **Team Photos** - Squad photos and group pictures
  - **Trophy Moments** - Trophy presentations and celebrations
  - **Our Fans** - Supporter photos and fan moments
  - **Training Session** - Training ground activities
  - **Behind the Scenes** - Backstage and preparation moments

#### **Featured Image** _(Optional)_

- Type: True/False Toggle
- Description: Mark to display in gallery page hero section
- Default: False
- **Note**: Featured images appear prominently at top of gallery page

#### **Featured Priority** _(Conditional)_

- Type: Number
- Description: Display order for featured images
- Range: 1-7
- Shows only if: "Featured Image" = True
- Layout:
  - **1** = Center big image
  - **2-7** = Surrounding smaller images
- Example: Priority 1 is the main showcase image

---

## Ghana Premier League Clubs

Database of all GPL teams for reference in fixtures and player careers.

### Fields

#### **Club Name** _(Required)_

- Type: Text
- Description: Official name of the club
- Example: "Asante Kotoko SC", "Hearts of Oak SC"

#### **Club Logo** _(Required)_

- Type: Image Upload
- Description: Official club badge/logo
- Recommended Size: 500x500px
- Format: PNG with transparent background preferred

#### **Founded** _(Optional)_

- Type: Number
- Description: Year the club was established
- Example: 1935

#### **Stadium** _(Optional)_

- Type: Text
- Description: Home stadium name
- Example: "Baba Yara Sports Stadium"

#### **Is Active** _(Required)_

- Type: True/False Toggle
- Description: Is the club currently active in GPL?
- Default: True

---

## Competitions

Manage different competitions and tournaments the club participates in.

### Fields

#### **Competition Name** _(Required)_

- Type: Text
- Description: Full name of the competition
- Example: "Ghana Premier League", "MTN FA Cup"

#### **Short Name** _(Optional)_

- Type: Text
- Description: Abbreviated name
- Example: "GPL", "FA Cup"

#### **Icon** _(Optional)_

- Type: Image Upload
- Description: Competition logo or icon
- Recommended Size: 200x200px

#### **Competition Type** _(Optional)_

- Type: Select Dropdown
- Description: Category of competition
- Options:
  - **Domestic League** - National league competitions
  - **Domestic Cup** - National cup tournaments
  - **Continental** - CAF and international competitions

---

## Staff Members

Management team, coaches, and staff profiles.

### Fields

#### **Full Name** _(Required)_

- Type: Text
- Description: Staff member's complete name
- Example: "Kwaku Danso"

#### **Role/Position** _(Required)_

- Type: Text
- Description: Job title or position
- Example: "Head Coach", "Team Manager", "Physiotherapist"

#### **Photo** _(Optional)_

- Type: Image Upload
- Description: Professional headshot
- Recommended Size: 400x400px

#### **Biography** _(Optional)_

- Type: Text Area
- Description: Background and career history

#### **Years with Club** _(Optional)_

- Type: Text
- Description: How long with the club
- Example: "2020 - Present"

---

## Club Identity

Club's mission, vision, values and core pillars.

### Club Identity Info

#### **Title** _(Required)_

- Type: Text
- Description: Section heading
- Example: "Our Mission", "Our Vision"

#### **Icon** _(Optional)_

- Type: Image Upload
- Description: Icon representing this identity aspect

#### **Content** _(Required)_

- Type: Text Area
- Description: Detailed description
- Example: "To develop world-class football talent while serving our community..."

### Club Pillars

#### **Pillar Name** _(Required)_

- Type: Text
- Description: Name of the pillar
- Example: "Excellence", "Integrity", "Community"

#### **Description** _(Required)_

- Type: Text Area
- Description: What this pillar means

#### **Icon** _(Optional)_

- Type: Image Upload
- Description: Icon representing this pillar

---

## Trophy Cabinet

Club's honors, trophies, and achievements.

### Fields

#### **Trophy Name** _(Required)_

- Type: Text
- Description: Name of the trophy or honor
- Example: "MTN FA Cup", "Ghana Premier League"

#### **Year Won** _(Required)_

- Type: Number
- Description: Year the trophy was won
- Example: 2016

#### **Trophy Image** _(Optional)_

- Type: Image Upload
- Description: Photo of the trophy

#### **Description** _(Optional)_

- Type: Text Area
- Description: Story or details about winning the trophy

#### **Category** _(Optional)_

- Type: Select Dropdown
- Options:
  - League Title
  - Cup Trophy
  - Other Achievement

---

## Wall of Fame

Legendary players, coaches, and club legends.

### Fields

#### **Person Name** _(Required)_

- Type: Text
- Description: Name of the legend
- Example: "Yaw Acheampong"

#### **Category** _(Required)_

- Type: Reference
- Description: Type of legend
- Links to: Wall of Fame Category
- Examples: "Club Legends", "Top Scorers", "Coaching Greats"

#### **Photo** _(Optional)_

- Type: Image Upload
- Description: Portrait of the person

#### **Years Active** _(Optional)_

- Type: Text
- Description: Period with the club
- Example: "2005-2015"

#### **Achievement Summary** _(Optional)_

- Type: Text Area
- Description: Key accomplishments
- Example: "147 goals in 253 appearances, 3-time top scorer"

---

## Record Breakers

Club records and record holders.

### Fields

#### **Record Title** _(Required)_

- Type: Text
- Description: Name of the record
- Example: "Most Goals in a Season", "Longest Unbeaten Run"

#### **Record Holder** _(Optional)_

- Type: Text
- Description: Who holds this record
- Example: "Emmanuel Asante"

#### **Record Value** _(Required)_

- Type: Text
- Description: The actual record
- Example: "32 goals", "18 matches"

#### **Year Set** _(Optional)_

- Type: Number
- Description: When the record was set
- Example: 2016

#### **Description** _(Optional)_

- Type: Text Area
- Description: Context and story about the record

---

## Club History

Major milestones and historical moments.

### Fields

#### **Year** _(Required)_

- Type: Number
- Description: Year of the historical event
- Example: 1966

#### **Event Title** _(Required)_

- Type: Text
- Description: Short title of what happened
- Example: "Club Founded"

#### **Description** _(Required)_

- Type: Text Area
- Description: Detailed story of the event

#### **Event Type** _(Optional)_

- Type: Select Dropdown
- Options:
  - Foundation
  - Trophy Win
  - Stadium Opening
  - Promotion
  - Other Milestone

#### **Image** _(Optional)_

- Type: Image Upload
- Description: Photo from that period

---

## Facilities

Club's training grounds, stadiums, and infrastructure.

### Fields

#### **Facility Name** _(Required)_

- Type: Text
- Description: Name of the facility
- Example: "Nana Fosu Gyeabour Park"

#### **Facility Type** _(Required)_

- Type: Select Dropdown
- Options:
  - Stadium
  - Training Ground
  - Youth Academy
  - Medical Center
  - Other

#### **Location** _(Optional)_

- Type: Text
- Description: Address or area
- Example: "Bechem, Ahafo Region"

#### **Description** _(Optional)_

- Type: Text Area
- Description: Details about the facility

#### **Capacity** _(Optional)_

- Type: Number
- Description: Seating/accommodation capacity
- Example: 6000

#### **Images** _(Optional)_

- Type: Multiple Image Upload
- Description: Photos of the facility

#### **Opened Year** _(Optional)_

- Type: Number
- Description: When the facility was built
- Example: 2006

---

## Page Settings

All page settings are singleton documents (only one exists for each page type).

### Home Page Settings

- Hero News Button Text
- News Section Title & Subtext
- Fixture Section Title & Subtext
- Shop Section Title & Subtext
- Photo Highlights Title & Subtext

### News Page Settings

- Page Banner Image
- Featured News Section Title & Subtext
- Latest Updates Section Title & Subtext

### Fixtures Page Settings

- Page Title
- Page Banner Image
- Upcoming Fixtures Title & Subtext
- Results Title & Subtext
- View More Button Text
- Watch Live Card Text
- Watch Live/Highlights CTA Texts

### Players Page Settings

- Page Title
- Page Banner Image
- Search Input Placeholder Text

### Shop Page Settings

- Page Title
- Page Banner Image
- Section Title & Subtext

### Club Page Settings

- Club Name on Banner
- Club Slogan on Banner
- Page Banner Image
- Club Identity Section Title & Subtitle
- Pillars Section Title & Subtitle
- Management Section Title & Subtitle
- History Section Title & Subtitle
- Facilities Section Title & Subtitle
- Trophy Cabinet Title & Subtitle
- Wall of Fame Title & Subtitle
- Join Hunters Pack Section (Title, Description, Button Text, Gallery Images)

### Gallery Page Settings

- Page Banner Image
- Featured Section Title
- Gallery Section Title
- Category Filter Labels

### Contact Us Settings

- Page Title
- Page Banner Image
- Contact Info Section Title & Subtitle
- Phone Number
- Email Address
- Location Address
- Map Section Title & Subtext

### Footer Settings

- Footer Description
- Location
- Phone
- Email
- Social Media Links (Facebook, Twitter, Instagram, YouTube, TikTok)

### Sponsor Settings

- Sponsor Section Title
- Sponsor Logos (Array)
  - Name
  - Logo Image
  - Website URL
  - Display Order

### Newsletter Settings

- Section Title
- Section Subtext
- Input Placeholder
- Button Text

### Live Matches Settings

- Live Section Title
- Live Section Description
- Video Thumbnail
- Video URL
- Is Live Status
- Live Section Button Text

### Past Highlights Settings

- Page Title
- Page Banner
- Section Title
- Section Subtitle
- View More Text
- Watch Live Card (Title, Description, Button Text, Background Image)

---

## Important Notes

### Featured Content Limits

- **News Articles**: Maximum 4 featured articles at once
- **Gallery Images**: Maximum 7 featured images (1 center + 6 surrounding)

### Auto-Generated Fields

- **Slugs**: Automatically created from titles (can be edited)
- **Published Dates**: Auto-set to current date/time (can be modified)
- **YouTube Data**: Auto-fetched when using "Fetch YouTube Data" button on Match Highlights

### Conditional Fields

Some fields only appear based on other selections:

- Player statistics appear based on player position
- Match scores appear only for non-upcoming matches
- Product type appears only for jersey category
- GPL club vs custom club fields in player career

### References

Several documents reference others:

- Match Highlights → Competitions & Players
- Match Fixtures → Match Highlights
- Players → GPL Clubs (career history)
- Gallery Images → Categories

---

## Getting Help

For technical support or questions about using the Sanity CMS:

1. Check this documentation first
2. Contact the website development team
3. Refer to Sanity's official documentation at sanity.io/docs

---

**Last Updated**: January 2026  
**Website**: Bechem United FC Official Website  
**CMS**: Sanity Content Management System
