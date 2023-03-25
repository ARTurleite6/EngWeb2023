import mongoose, { Schema } from "mongoose";
const PessoaSchema = new Schema({
    _id: { type: String, required: true },
    nome: { type: String, required: true },
    idade: { type: Number, required: true },
    sexo: { type: String, required: true },
    morada: { type: { cidade: { type: String, required: true }, distrito: { type: String, required: true } }, required: true },
    BI: String,
    CC: String,
    profissao: { type: String, required: true },
    partido_politico: { type: { party_abbr: { type: String, required: true }, party_name: { type: String, required: true } }, required: true },
    religiao: { type: String },
    desportos: { type: [String], required: true },
    animais: { type: [String], required: true },
    figura_publica_pt: { type: [String], required: true },
    marca_carro: { type: String, required: true },
    destinos_favoritos: { type: [String], required: true },
    atributos: { type: {
            fumador: { type: Boolean, required: true },
            gosta_cinema: { type: Boolean, required: true },
            gosta_viajar: { type: Boolean, required: true },
            acorda_cedo: { type: Boolean, required: true },
            gosta_ler: { type: Boolean, required: true },
            gosta_musica: { type: Boolean, required: true },
            gosta_comer: { type: Boolean, required: true },
            gosta_animais_estimacao: { type: Boolean, required: true },
            gosta_dancar: { type: Boolean, required: true },
            comida_favorita: { type: String, required: true },
        },
        required: true
    }
});
export const PessoaModel = mongoose.model('pessoas', PessoaSchema);
