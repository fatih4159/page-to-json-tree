
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/Spinner";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { convertHtmlToJson } from "@/utils/htmlToJson";

const Index = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResult, setJsonResult] = useState<object | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    try {
      setLoading(true);
      const result = await convertHtmlToJson(url);
      setJsonResult(result);
      toast.success("HTML successfully converted to JSON");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Failed to convert HTML to JSON. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!jsonResult) return;
    
    const blob = new Blob([JSON.stringify(jsonResult, null, 2)], {
      type: "application/json",
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = "page-structure.json";
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("JSON file downloaded");
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
          HTML to JSON Tree Converter
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Enter a URL to convert its HTML structure into a downloadable JSON tree
        </p>

        <Card className="p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow"
                disabled={loading}
              />
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                disabled={loading || !url}
              >
                {loading ? <Spinner className="mr-2" /> : null}
                {loading ? "Converting..." : "Convert to JSON"}
              </Button>
            </div>
          </form>

          {jsonResult && (
            <div className="mt-6 space-y-4">
              <div className="h-[300px] overflow-auto rounded border border-border bg-muted p-4">
                <pre className="text-xs font-mono">
                  {JSON.stringify(jsonResult, null, 2)}
                </pre>
              </div>
              <Button 
                onClick={handleDownload} 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                Download JSON
              </Button>
            </div>
          )}
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>This tool fetches the HTML from the provided URL and converts it to a JSON tree structure.</p>
          <p className="mt-1">Note: Some websites may block requests due to CORS policies.</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
