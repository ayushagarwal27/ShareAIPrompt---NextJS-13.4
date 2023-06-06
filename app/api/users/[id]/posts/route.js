import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: id }).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};
