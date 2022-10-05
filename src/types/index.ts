export interface Pokemons {
    id: number,
    name: string,
    height:number,
    weight:number,
    imageUrl: string,
    base_experience: number,
    favourite:boolean,
    moves: any[]
}
export interface PokemonDetail {
    id: number,
    name: string,
    height:number,
    weight:number,
    Img1: string,
    Img2: string,
    Img3: string,
    base_experience: number,
    stats: {
        base_stat:number,
        effort: number,
        stat: {
            name: string,
            url: string
        }
    }[],
    moves: any[]
}