import { useRouter } from "next/navigation";
import getStripe from "@/lib/get-stripe";
export default function Pricing() {
  const router=useRouter();
  const handleFree=()=>{
    router.push("/generate")
  }
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <div className="bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white">Our Pricing Plans</h2>
        <p className="text-gray-400 mt-4">
          Choose the plan that best suits your needs. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div className="bg-gray-900 text-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4">Basic</h3>
          <p className="text-gray-400 mb-6">
            For individuals who are just getting started.
          </p>
          <div className="text-4xl font-bold mb-6">
            $0<span className="text-xl">/mo</span>
          </div>
          <ul className="mb-6 space-y-4">
            <li>✔ 5 sets of flashcards</li>
            <li>✔ Basic Support</li>
          </ul>
          <button onClick={handleFree} className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300">
            Get Started
          </button>
        </div>


        <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 border-2 border-purple-500">
          <h3 className="text-2xl font-semibold mb-4">Pro</h3>
          <p className="text-gray-400 mb-6">
            For Learners who enjoy our amazing flashcards.
          </p>
          <div className="text-4xl font-bold mb-6">
            $10<span className="text-xl">/mo</span>
          </div>
          <ul className="mb-6 space-y-4">
            <li>✔ 50 sets of flashcards</li>
            <li>✔ Priority Support</li>
          </ul>
          <button onClick={handleSubmit} className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
