const axios = require('axios');

exports.name = '/twpost';
exports.index = async (req, res, next) => {
   const id = req.query.id;
   if (!id) {
        return res.status(400).json({ error: 'thieu id' });
   }
try {
                    const response = await axios.get('https://x.com/i/api/graphql/Y9WM4Id6UcGFE8Z-hbnixw/UserTweets', {
                      params: {
                        'variables': `{"userId": "${id}","count":20,"includePromotedContent":true,"withQuickPromoteEligibilityTweetFields":true,"withVoice":true,"withV2Timeline":true}`,
                        'features': '{"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false}',
                        'fieldToggles': '{"withArticlePlainText":false}'
                      },
                      headers: {
                        'accept': '*/*',
                        'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
                        'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
                        'content-type': 'application/json',
                        'cookie': 'night_mode=2; kdt=Hs65hChq3pZ8I6wmJ4Ko5BVfoKfCkjUaC8hfFZHM; dnt=1; guest_id=v1%3A173795966998044352; guest_id_marketing=v1%3A173795966998044352; guest_id_ads=v1%3A173795966998044352; gt=1886307755428106566; auth_token=6a4c1d30af348c0e6e7ed73bb74dc26af0fa3162; ct0=811f490ee53503c6778cf3ab103889ca0f80bd20e7a58cd32e88071626c117244c9f7b7b049b2a641a9bc29054fa7c190c402c516fb3a881ddc50d88a206ffd852acbf2bc10a189344efe56c4659d61e; att=1-V2HaPTaG97sGwQTs3IsSrSrBTJB34tyvOGmgIaKO; lang=en; twid=u%3D1753696684419518464; personalization_id="v1_5oXS12V67TGmbBfmpX4A2A=="; des_opt_in=Y; _ga=GA1.2.1964264696.1738566624; _gid=GA1.2.1705339069.1738566624; ph_phc_TXdpocbGVeZVm5VJmAsHTMrCofBQu3e0kN8HGMNGTVW_posthog=%7B%22distinct_id%22%3A%220194c71c-5c24-7767-b80b-bce604055665%22%2C%22%24sesid%22%3A%5B1738569478088%2C%220194ca97-3cab-7359-8844-9f1a61e7a1df%22%2C1738565696683%5D%7D; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D',
                        'priority': 'u=1, i',
                        'referer': 'https://x.com/',
                        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
                        'x-client-transaction-id': 'oR7NicvB4WjtJ7rkNVDPlNtQHdLt60uwULF4Ns93/0Xi3dIFulexJDY4D1lI6dfxDAqA8KIN0rAp3eI7JUCezb4feIXyog',
                        'x-client-uuid': '7eaf3c22-ade7-4ef7-a254-3e062f6dd82c',
                        'x-csrf-token': '811f490ee53503c6778cf3ab103889ca0f80bd20e7a58cd32e88071626c117244c9f7b7b049b2a641a9bc29054fa7c190c402c516fb3a881ddc50d88a206ffd852acbf2bc10a189344efe56c4659d61e',
                        'x-twitter-active-user': 'yes',
                        'x-twitter-auth-type': 'OAuth2Session',
                        'x-twitter-client-language': 'en'
                      }
                    });
res.json(response.data);
        } catch (error) {
        console.error('Error fetching data from urlscan.io:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
