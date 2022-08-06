import React, { useEffect, useState } from 'react';
import AutoHeightWebView from 'react-native-autoheight-webview';

function Embed({ url } : {url: string}) {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    async function fetchEmbed(url : string) {
      try {
        setLoading(true);
        const res = await fetch(`https://cdn.iframe.ly/api/oembed?url=${encodeURIComponent(url)}&api_key=2148d64711d47f3982f079&iframe=1&ssl=1&omit_script=1`);
        const data = await res.json();
        if (!data.html) throw Error('Not a valid url for embed');
        setHtml(data.html);
      } catch {
        setHtml('');
      } finally {
        setLoading(false);
      }
    }
    fetchEmbed(url);
  }, [url]);

  return !loading && html ? (
    <AutoHeightWebView
      originWhitelist={['*']}
      scrollEnabled={false}
      source={{ html }}
      javaScriptEnabled
    />
  ) : null;
}

export default Embed;
