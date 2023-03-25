import { Pessoa, PessoaModel } from "../models/pessoa.js";

export async function createPessoa(pessoa: Pessoa): Promise<Pessoa> {
    const response = await PessoaModel.create(pessoa);
    return response;
}

export async function getPessoas(): Promise<Pessoa[]> {
    return await PessoaModel.find().exec();
}

export async function getPessoa(id: string): Promise<Pessoa | null> {
    return await PessoaModel.findById(id).exec();
}

export async function updatePessoa(id: string, novaPessoa: Pessoa): Promise<Pessoa | null> {
    return await PessoaModel.findByIdAndUpdate(id, novaPessoa).exec();
}

export async function deletePessoa(id: string): Promise<Pessoa | null> {
    return await PessoaModel.findByIdAndDelete(id).exec();
}