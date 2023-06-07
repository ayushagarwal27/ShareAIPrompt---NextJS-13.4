import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

// Get prompt
export const GET = async (request, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    const prompt = await Prompt.findById(id).populate('creator');
    if (!prompt) return new Response('Prompt not found', { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

// Update prompt
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  const id = params.id;
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(id);
    if (!prompt) return new Response('Prompt not found', { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to update the prompt', { status: 500 });
  }
};

// Delete prompt
export const DELETE = async (request, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(id);
    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 });
  }
};
