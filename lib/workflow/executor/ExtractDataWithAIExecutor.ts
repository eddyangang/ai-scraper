import { ExecutionEnvironment } from '@/types/executor';
import { ClickElementTask } from '../task/ClickElement';
import { ExtractDataWithAITask } from '../task/ExtractDataWithAI';
import prisma from '@/lib/prisma';
import { symmetricDecrypt } from '@/lib/encryption';

export async function ExtractDataWithAIExecutor(
    environment: ExecutionEnvironment<typeof ExtractDataWithAITask>
): Promise<boolean> {
    try {
        const credentials = environment.getInput('Credentials');
        if (!credentials) {
            environment.log.error('input->credentials not defined');
        }

        const prompt = environment.getInput('Prompt');
        if (!prompt) {
            environment.log.error('input->prompt not defined');
        }

        const content = environment.getInput('Content');
        if (!content) {
            environment.log.error('input->content not defined');
        }

        // Get credentials from db
        const crediential = await prisma.credentials.findUnique({
            where: { id: credentials },
        });

        if (!crediential) {
            environment.log.error('crediential not found');
            return false;
        }

        const plainCredentialValue = symmetricDecrypt(crediential.value);
        if (!plainCredentialValue) {
            environment.log.error('cannot decrypt crediential');
            return false;
        }

        console.log('@@PLAIN CREDENTIAL', plainCredentialValue);

        return true;
    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }
}
