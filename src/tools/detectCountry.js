let map = {
    "Kiev": "UA",
    "Uzhgorod": "UA",
    "Zaporozhye": "UA",
    "Wake": "US",
    "New_York": "US",
    "Detroit": "US",
    "Louisville": "US",
    "Monticello": "US",
    "Indianapolis": "US",
    "Vincennes": "US",
    "Winamac": "US",
    "Marengo": "US",
    "Petersburg": "US",
    "Vevay": "US",
    "Chicago": "US",
    "Tell_City": "US",
    "Knox": "US",
    "Menominee": "US",
    "Center": "US",
    "New_Salem": "US",
    "Beulah": "US",
    "Denver": "US",
    "Boise": "US",
    "Phoenix": "US",
    "Los_Angeles": "US",
    "Anchorage": "US",
    "Juneau": "US",
    "Sitka": "US",
    "Metlakatla": "US",
    "Yakutat": "US",
    "Nome": "US",
    "Adak": "US",
    "Honolulu": "US",
    "Midway": "US",
    "St_Thomas": "US",
  }
  
 export default () => {
    if (!global.Intl) return
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    let city = tz.split('/')[1]
    return map[city] || 'other'
 }
