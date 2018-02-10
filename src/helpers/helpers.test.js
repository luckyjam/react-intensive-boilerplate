// Core
import { getFullApiUrl, getRandomColor, getUniqueID, trimOverview } from './';


const api =  'https://api.themoviedb.org/3/discover/movie?certification_country=US&';
const key = 'f95b4780d100c9d941e03e79486e1503';
const addQuery = '&sort_by=popularity.desc';
const assert = 'api, key and addQuery should be a string';
const hashSymbol = 35;
const hexLength = 7;
const assertUniqueId = 'Length should be a number';
const overview = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam temporibus eius consequatur fugiat. Accusamus sequi cum, exercitationem deserunt obcaecati est vitae modi magnam sapiente non molestiae ipsum, cupiditate commodi nihil. Ipsa culpa doloremque quisquam assumenda fugit nesciunt minima, rerum saepe consequatur laborum et omnis harum veniam ut placeat beatae debitis ducimus nihil voluptatum quaerat ex possimus sed repellat. Ducimus expedita magni illum laboriosam molestiae officia porro, quos placeat, omnis eos accusantium, voluptas qui ipsum molestias perferendis! Quam alias recusandae numquam similique totam aliquid repellendus aspernatur assumenda sed, neque vitae officia, dolorum in explicabo impedit excepturi culpa perferendis commodi ad non! Ratione sint omnis, molestias aspernatur fugiat magni impedit a accusamus quo mollitia cupiditate voluptates perferendis. Consequuntur vitae expedita reprehenderit sit, repellendus sapiente voluptatum obcaecati itaque suscipit atque. Cum nulla eius maiores facilis consequuntur doloremque pariatur eum quidem quis repellendus exercitationem vero, veniam fugiat incidunt, rem debitis atque. Iste totam voluptatibus quia tenetur illo alias nemo! Non eos magnam obcaecati dolores veniam dignissimos a consequatur doloribus, tempora quia ratione deleniti voluptas deserunt cupiditate dolorum autem fuga odio, ullam temporibus voluptatibus praesentium? Eius iste laboriosam aspernatur quia, ea omnis suscipit minima dolor nostrum consequuntur, illo sit, ipsam porro! Vel nobis pariatur aliquid.';
const overviewLength = overview.length;
const overviewLong = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo sapiente commodi enim, in distinctio adipisci eveniet similique modi explicabo atque illum culpa accusamus maxime alias dicta fugiat possimus. Inventore magnam consequuntur minima doloribus facere, veniam ipsa neque facilis et ullam eius error architecto, commodi repellat impedit fugit sunt sapiente voluptatibus, libero autem explicabo velit in minus saepe? Rerum minus recusandae culpa ea tempore repellat voluptate quidem dignissimos reprehenderit amet. Incidunt dignissimos accusantium natus ipsum blanditiis obcaecati quod, corrupti amet maiores ex autem nostrum enim laborum voluptatibus, exercitationem nihil asperiores rem reprehenderit perspiciatis ab eaque harum. Magni sapiente nam id vero, dolore delectus! Repellendus magnam fugiat ipsa, suscipit laborum nesciunt impedit eligendi. Tenetur cumque repellat obcaecati doloremque, corporis rerum possimus impedit suscipit explicabo nulla eum, numquam aliquid aliquam tempore, sit sint! Totam, maiores qui ratione saepe impedit repellendus fuga modi quaerat quos a reiciendis animi cum iusto, eius illo. Nemo ea tenetur aliquid animi, unde fuga quia ullam sapiente veniam possimus ab eos ipsa explicabo illo qui dolorum, architecto, quaerat corporis! Eos deserunt libero corporis illo voluptatem in at aspernatur dolor iure fugiat, repudiandae ut obcaecati quis nobis eius et eaque necessitatibus veritatis nam. Hic harum eveniet fugit ullam. Mollitia dolorem optio et voluptatibus sit quam dolores, veritatis earum eum quidem nihil nam adipisci qui quibusdam quod amet enim harum neque. Maiores molestiae numquam iure in beatae. Neque accusamus aliquam rem officiis dicta reprehenderit deserunt animi tempore quibusdam, magni incidunt veniam explicabo sit! Quam nisi ipsa asperiores corporis inventore adipisci veritati s a uem!';
const overviewExpectedLength = 250;
const assertTrimOverview = 'overview should be a string';
// const colorTest = /[A-F, a-f, 0-9]/;

describe('helper', () => {
    test('getFullApiUrl should be a function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl function should trow an error if wrong non-string arguments were passed', () => {
        function getFullApiUrlWithError () {
            getFullApiUrl(null, 1);
        }

        expect(getFullApiUrlWithError).toThrowError(assert);
    });

    test('getFullApiUrl should return full API if executed successfully', () => {
        expect(getFullApiUrl(api, key, addQuery)).toBe(`${api}api_key=${key}${addQuery}`);
    });

    test('getFullApiUrl without addQuery parameter should return full API if executed successfully', () => {
        expect(getFullApiUrl(api, key)).toBe(`${api}api_key=${key}`);
    });

    test('getRandomColor should be a function', () => {
        expect(typeof getRandomColor).toBe('function');
    });

    test('getRandomColor should return string', () => {
        expect(typeof getRandomColor()).toBe('string');
    });

    test('getRandomColor should return first symbol to be hash', () => {
        expect(getRandomColor().charCodeAt(0)).toBe(hashSymbol);
    });

    test('getRandomColor should return string with a length of 7', () => {
        expect(getRandomColor().length).toBe(hexLength);
    });

    test('getUniqueID should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID should return string', () => {
        expect(typeof getUniqueID(7)).toBe('string');
    });

    test('getUniqueID function should trow an error if wrong non-number argument was passed', () => {
        function getUniqueIdWithError () {
            getUniqueID(null);
        }

        expect(getUniqueIdWithError).toThrowError(assertUniqueId);
    });

    test('getUniqueID should return string with specified length', () => {
        expect(getUniqueID(7).length).toBe(7);
    });

    test('trimOverview should return string', () => {
        expect(typeof trimOverview(overview)).toBe('string');
    });

    test('trimOverview should be a function', () => {
        expect(typeof trimOverview).toBe('function');
    });

    test(`trimOverview should return string with a length less or equal to ${overviewExpectedLength}`, () => {
        expect(trimOverview(overview).length).toBeLessThanOrEqual(overviewExpectedLength);
    });

    test('trimOverview should add 3 dots to the end of returned overview, if initial value was longer than 250 characters', () => {
        expect(trimOverview(overviewLong).substr(overviewExpectedLength - 3, overviewExpectedLength)).toBe('...');
    });

    test('trimOverview should not add 3 dots to the end of returned overview, if initial value was not longer than 250 characters', () => {
        expect(trimOverview(overview).substr(overviewLength - 3, overviewLength)).not.toBe('...');
    });

    test('trimOverview should delete last character of the long overview, if the character is space or special character before adding 3 dots', () => {
        expect(trimOverview(overviewLong).charAt(overviewExpectedLength - 4)).toMatch(/[\w\d]/);
    })

    test('trimOverview should throw an error if wrong non-string argument was passed', () => {
        function trimOverviewWithError () {
            trimOverview(null);
        }

        expect(trimOverviewWithError).toThrowError(assertTrimOverview);
    });

});
