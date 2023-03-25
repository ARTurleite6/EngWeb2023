import { PessoaModel } from "../models/pessoa.js";
export async function createPessoa(pessoa) {
    const response = await PessoaModel.create(pessoa);
    return response;
}
export async function getPessoas() {
    return await PessoaModel.find().exec();
}
export async function getPessoa(id) {
    return await PessoaModel.findById(id).exec();
}
export async function updatePessoa(id, novaPessoa) {
    return await PessoaModel.findByIdAndUpdate(id, novaPessoa).exec();
}
export async function deletePessoa(id) {
    return await PessoaModel.findByIdAndDelete(id).exec();
}
