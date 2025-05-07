import { ExecutionEnvironment } from '@/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/LaunchBrowser';

export async function LaunchBrowserExecutor(
    environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
    try {
        const websiteUrl = environment.getInput('Website URL');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--proxy-server=brd.superproxy.io:33335'],
        });
        environment.log.info('Browser started successfully');
        environment.setBrowser(browser);
        const page = await browser.newPage();
        page.setViewport({ width: 1440, height: 1440 });

        await page.authenticate({
            username: process.env.BROWSER_SCAN_USERNAME as string,
            password: process.env.BROWSER_SCAN_PASSWORD as string,
        });
        await page.goto(websiteUrl);
        environment.setPage(page);
        environment.log.info(`Opened page at: ${websiteUrl}`);
        return true;
    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }
}
