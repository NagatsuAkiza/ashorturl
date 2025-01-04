import UrlInputForm from "@/components/UrlInputForm";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6 rounded-lg">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">URL Shortener</h1>
        <p className="text-gray-600 mb-8">
          Simplify your links effortlessly. Enter a URL below and get a short version instantly.
        </p>
        <UrlInputForm />
      </div>
    </main>
  );
}
