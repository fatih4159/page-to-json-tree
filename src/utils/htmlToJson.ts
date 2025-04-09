
export const convertHtmlToJson = async (url: string): Promise<object> => {
  try {
    let html: string;
    
    try {
      // First attempt: Try direct fetch (might fail due to CORS)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('CORS error or invalid URL');
      }
      html = await response.text();
    } catch (error) {
      // Second attempt: Use a CORS proxy
      // For demo purposes, we'll use a public CORS proxy
      // In production, you would use your own proxy service
      const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const proxyResponse = await fetch(corsProxyUrl);
      
      if (!proxyResponse.ok) {
        throw new Error(`Failed to fetch URL: ${proxyResponse.statusText}`);
      }
      
      html = await proxyResponse.text();
    }
    
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    // Convert the DOM to JSON
    const jsonTree = domToJson(doc.documentElement);
    
    return jsonTree;
  } catch (error) {
    console.error("Error converting HTML to JSON:", error);
    throw error;
  }
};

const domToJson = (node: Element): object => {
  const obj: any = {
    tagName: node.tagName.toLowerCase(),
    attributes: {},
    children: []
  };
  
  // Extract attributes
  for (let i = 0; i < node.attributes.length; i++) {
    const attr = node.attributes[i];
    obj.attributes[attr.name] = attr.value;
  }
  
  // Process child nodes
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i];
    
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.nodeValue?.trim();
      if (text) {
        obj.children.push({
          type: "text",
          content: text
        });
      }
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      obj.children.push(domToJson(child as Element));
    }
  }
  
  return obj;
};
