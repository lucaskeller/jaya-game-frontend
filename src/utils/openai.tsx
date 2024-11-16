import { Question } from '../types';
import { openaiInstance } from './openaiInstance';

export const fetchQuestion = async (): Promise<Question> => {
  const prompt = `
    Crie uma pergunta de múltipla escolha com 4 opções, incluindo a correta, no seguinte formato:
    Pergunta: [texto da pergunta]
    Opções:
    A: [opção 1]
    B: [opção 2]
    C: [opção 3]
    D: [opção 4]
    Correta: [A, B, C ou D]
  `;

  try {
    const response = await openaiInstance.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    const question = parseResponse(response.choices[0].text || '');
    return question;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};

const parseResponse = (responseText: string): Question => {
  // Ajustando o regex para lidar com variações e quebras de linha
  const match = responseText.match(
    /Pergunta:\s*(.+?)\s*Opções:\s*A:\s*(.+?)\s*B:\s*(.+?)\s*C:\s*(.+?)\s*D:\s*(.+?)\s*Correta:\s*(A|B|C|D)/
  );

  if (!match) {
    throw new Error('Failed to parse OpenAI response');
  }

  // Desestruturando a correspondência
  const [_, text, optionA, optionB, optionC, optionD, correctLetter] = match;
  const options = [optionA, optionB, optionC, optionD];

  // Mapear a letra da opção correta para a posição correspondente no array
  const correctAnswer = options[['A', 'B', 'C', 'D'].indexOf(correctLetter)];

  return {
    id: Date.now(), // Gerar um ID único ou de outra forma
    text,
    options,
    correctAnswer,
  };
};

