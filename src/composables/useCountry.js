import { useFetchBackend } from './fetch.js'

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export function useCountries() {
    const { data, error, fetchData } = useFetchBackend()
    const load_countries= () => fetchData('country')

    return {
        load_countries,
        countries: data    
    }

}

/*


const getCountries = async () => {
    return useFetchBackend('country')
}

const geocodeQuery = async (q, country_iso, format='json') => {
	const url = new URL(NOMINATIM_URL)

	url.searchParams.append('q', q)
	url.searchParams.append('countrycodes', country_iso)
	url.searchParams.append('format', format)

	const res = await fetch(url)	

	if (res.ok) {
		const json = await res.json()
		return json
	} else {
		return []
	}
}

export function useCountry() {
    return {
        getCountries,
		geocodeQuery
    }
}
*/
