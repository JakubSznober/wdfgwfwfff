import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Database seeden...')

  // --- Admin gebruiker ---
  const username = process.env.ADMIN_USERNAME || 'admin'
  const rawPassword = process.env.ADMIN_PASSWORD || 'blissbone2024'
  const hashed = await bcrypt.hash(rawPassword, 12)

  await prisma.adminUser.upsert({
    where: { username },
    create: { username, password: hashed },
    update: { password: hashed },
  })
  console.log(`✅ Admin aangemaakt: ${username}`)
  if (!process.env.ADMIN_PASSWORD) {
    console.warn('⚠️  Standaard wachtwoord actief! Stel ADMIN_PASSWORD in .env in.')
  }

  // --- Producten ---
  const products = [
    {
      name: 'Kippenpoten',
      description: 'Gedroogde kippenpoten – rijk aan glucosamine en chondroïtine voor gezonde gewrichten.',
      price: 9.95,
      image: 'https://images.unsplash.com/photo-1625676756363-2b6b9ee2e44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      badge: 'Bestseller',
      category: 'Gevogelte',
      rating: 4.9,
      reviews: 238,
    },
    {
      name: 'Rundvleesreepjes',
      description: 'Langzaam gedroogde rundvleesreepjes – puur vlees zonder toevoegingen, glutenvrij.',
      price: 12.95,
      originalPrice: 15.95,
      image: 'https://images.unsplash.com/photo-1761472085448-a8031cbca3f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      badge: 'Actie',
      category: 'Rund',
      rating: 4.8,
      reviews: 192,
    },
    {
      name: 'Eendenhals',
      description: 'Volledig gedroogde eendenhals – ideaal voor tandhygiëne en een natuurlijke kauwbeleving.',
      price: 11.95,
      image: 'https://images.unsplash.com/photo-1760445529964-4f084f5d1b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'Gevogelte',
      rating: 4.7,
      reviews: 154,
    },
    {
      name: 'Varkensoortjes',
      description: 'Gedroogde varkensoortjes – krokant kauwgenot met van nature aanwezig kraakbeen.',
      price: 8.95,
      image: 'https://images.unsplash.com/photo-1565858426981-d60bfbe93b17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'Varken',
      rating: 4.6,
      reviews: 211,
    },
    {
      name: 'Lamslong',
      description: 'Luchtig gedroogde lamslong – licht verteerbaar, ideaal voor gevoelige magen.',
      price: 10.95,
      image: 'https://images.unsplash.com/photo-1695048475525-11eab42ad873?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      badge: 'Nieuw',
      category: 'Lam',
      rating: 4.8,
      reviews: 89,
    },
    {
      name: 'Hertengewei',
      description: 'Duurzaam hertengewei – lang kauwplezier, rijk aan mineralen en spoorelementen.',
      price: 14.95,
      image: 'https://images.unsplash.com/photo-1772186858744-afeefcc0049a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'Kauwstokken',
      rating: 4.9,
      reviews: 167,
    },
    {
      name: 'Konijnenoren',
      description: 'Gedroogde konijnenoren met vacht – zacht en lichtverteerbaar, ideaal voor kleine rassen en puppies.',
      price: 8.95,
      image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      badge: 'Nieuw',
      category: 'Konijn',
      rating: 4.7,
      reviews: 43,
    },
  ]

  for (const p of products) {
    const exists = await prisma.product.findFirst({ where: { name: p.name } })
    if (!exists) await prisma.product.create({ data: p })
  }
  console.log(`✅ ${products.length} producten geseeded`)

  // --- Standaard instellingen ---
  const defaults = [
    { key: 'contact_phone', value: '' },
    { key: 'contact_email', value: 'info@blissbone.nl' },
    { key: 'contact_kvk', value: '' },
    { key: 'contact_address', value: '' },
    { key: 'contact_city', value: '' },
    { key: 'footer_tagline', value: 'Premium natuurlijke hondensnacks' },
    { key: 'site_name', value: 'BlissBone' },
    { key: 'social_instagram', value: '' },
    { key: 'social_facebook', value: '' },
    { key: 'shipping_free_above', value: '50' },
    { key: 'shipping_cost', value: '4.95' },
  ]

  for (const s of defaults) {
    await prisma.setting.upsert({
      where: { key: s.key },
      create: s,
      update: {},
    })
  }
  console.log('✅ Standaard instellingen aangemaakt')

  // --- Blog posts ---
  const blogPosts = [
    {
      slug: 'voordelen-natuurlijke-gryzakken-honden',
      title: 'De 5 grootste voordelen van natuurlijke gryzakken voor uw hond',
      excerpt: 'Waarom steeds meer hondenbaasjes kiezen voor 100% natuurlijke kauwsnacks — en wat de wetenschap erover zegt.',
      content: `Steeds meer hondenbaasjes in Nederland switchen van kunstmatige snacks naar 100% natuurlijke alternatieven. En dat is niet zonder reden. In dit artikel bespreken we de vijf grootste voordelen van gedroogde, natuurlijke gryzakken voor uw hond.

**1. Geen gevaarlijke toevoegingen**
Veel commerciële hondensnacks bevatten kunstmatige kleurstoffen, conserveringsmiddelen en smaakversterkers. Langdurig gebruik van deze stoffen kan leiden tot allergieën, maagproblemen en zelfs huidirritatie. Natuurlijke gryzakken bevatten uitsluitend het drooggedroogde product — niets meer, niets minder.

**2. Goed voor tanden en kaakspieren**
Het kauwen op stevige, gedroogde snacks zoals pezen of kippenpoten helpt tandsteen te verwijderen en de kaakspieren te versterken. Het is een volledig natuurlijk alternatief voor synthetische tandpoetssticks.

**3. Rijk aan voedingsstoffen**
Gedroogd vlees, botten en organen zijn van nature rijk aan eiwitten, mineralen en vitamines. Kippenpoten bevatten van nature glucosamine en chondroïtine — essentieel voor gezonde gewrichten, zeker bij oudere honden of grote rassen.

**4. Langer bezig, minder stress**
Een natuurlijke gryzak houdt uw hond mentaal bezig. Dit vermindert vervelingsgedrag, knaagschade en overmatig blaffen. Zeker voor thuisblijvers een echte aanrader.

**5. EU-gecertificeerd en veilig**
BlissBone-producten zijn EU-goedgekeurd (veterinair nr. 14128301) en worden geproduceerd in Polen onder strenge Europese kwaliteitscontrole. U weet precies wat u uw hond geeft.`,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      category: 'Gezondheid',
    },
    {
      slug: 'droog-voer-versus-natuurlijke-snacks',
      title: 'Droogvoer vs. natuurlijke snacks: wat is beter voor uw hond?',
      excerpt: 'Een eerlijke vergelijking tussen industrieel droogvoer en 100% natuurlijke snacks — inclusief voor- en nadelen van beide.',
      content: `Als hondenbaasje staat u voor talloze keuzes als het gaat om voeding. Droogvoer, natvoer, BARF of natuurlijke snacks — de opties zijn eindeloos. In dit artikel vergelijken we droogvoer met 100% natuurlijke snacks.

**Wat zit er in droogvoer?**
De meeste commerciële droogvoeders bevatten een mix van granen, vlees(bijproducten), plantaardige eiwitten en synthetische vitamines. Hoewel deze voeding veterinair goedgekeurd is, ontbreekt het aan de variatie en natuurlijkheid die een hond in het wild ook zou eten.

**Wat zijn natuurlijke snacks?**
Gedroogde natuurlijke snacks bestaan uit één ingrediënt: het product zelf. Geen toevoegingen, geen vulstoffen. Denk aan gedroogde kippenpoten, lamslong of rundvleesreepjes.

**De rol van snacks als aanvulling**
Wij raden aan om natuurlijke snacks te gebruiken als aanvulling op het reguliere dieet — niet als volledig vervanging. Als beloningssysteem of als dagelijkse kauwactiviteit zijn ze ideaal.

**Conclusie**
Droogvoer kan een prima basis zijn, maar 100% natuurlijke snacks van BlissBone zijn de perfecte aanvulling voor een gevarieerd en gezond hondendieet.`,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
      category: 'Voeding',
    },
    {
      slug: 'eu-certificering-hondenvoer-uitleg',
      title: 'Wat betekent EU-certificering voor hondenvoer?',
      excerpt: 'Alles wat u moet weten over veterinaire nummers, EU-keurmerken en waarom dit zo belangrijk is voor de veiligheid van uw hond.',
      content: `Als u een product ziet met "EU goedgekeurd" of een veterinair nummer, wat betekent dat precies? In dit artikel leggen we het helder uit.

**Wat is een veterinair nummer?**
Een veterinaire erkenning (ook wel "veterinair nummer") is een officiële registratie van een voedselproducent bij de bevoegde autoriteiten van een EU-lidstaat. Producenten met een veterinair nummer worden regelmatig gecontroleerd op hygiëne, grondstoffen en productieprocessen.

**BlissBone en veterinair nr. 14128301**
Onze producten worden geproduceerd in Polen, een EU-lidstaat met strenge voedselveiligheidsnormen. Het veterinair nummer 14128301 betekent dat onze productiefaciliteit geregistreerd en goedgekeurd is door de Poolse veterinaire autoriteiten.

**Waarom is dit belangrijk?**
Zonder EU-certificering kunt u als consument niet weten onder welke omstandigheden een product gemaakt is. Er zijn helaas veel goedkope hondensnacks op de markt die gemaakt worden buiten de EU, zonder enige kwaliteitscontrole.

**Onze belofte**
Bij BlissBone geloven we in volledige transparantie. Elk product is traceerbaar, EU-gecertificeerd en gemaakt van uitsluitend natuurlijke ingrediënten. Uw hond verdient niets minder.`,
      image: 'https://images.unsplash.com/photo-1649429398909-db7ae841f7f6?w=800&q=80',
      category: 'Kwaliteit',
    },
  ]

  for (const post of blogPosts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } })
    if (!existing) {
      await prisma.blogPost.create({ data: post })
    }
  }
  console.log('✅ Blog artikelen aangemaakt')

  console.log('\n🎉 Seed voltooid!')
}

main()
  .catch((e) => { console.error('Seed fout:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
