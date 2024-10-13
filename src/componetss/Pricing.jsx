import { CheckIcon } from '@heroicons/react/20/solid'


export default function Pricing() {
  return (
    <div class="bg-black py-12 px-4">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-white">Our Pricing Plans</h2>
      <p class="text-gray-400 mt-4">Choose the plan that best suits your needs. No hidden fees, cancel anytime.</p>
    </div>
  
    <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div class="bg-gray-900 text-white rounded-lg shadow-md p-6">
        <h3 class="text-2xl font-semibold mb-4">Basic</h3>
        <p class="text-gray-400 mb-6">For individuals who are just getting started.</p>
        <div class="text-4xl font-bold mb-6">
          $9<span class="text-xl">/mo</span>
        </div>
        <ul class="mb-6 space-y-4">
          <li>✔ 5 Projects</li>
          <li>✔ Basic Support</li>
          <li>✔ Access to Community</li>
        </ul>
        <button class="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300">Get Started</button>
      </div>
  
      
      <div class="bg-gray-900 text-white rounded-lg shadow-md p-6 border-2 border-purple-500">
        <h3 class="text-2xl font-semibold mb-4">Pro</h3>
        <p class="text-gray-400 mb-6">For professionals looking to level up their work.</p>
        <div class="text-4xl font-bold mb-6">
          $29<span class="text-xl">/mo</span>
        </div>
        <ul class="mb-6 space-y-4">
          <li>✔ 50 Projects</li>
          <li>✔ Priority Support</li>
          <li>✔ Advanced Features</li>
        </ul>
        <button class="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300">Get Started</button>
      </div>
  
    
      <div class="bg-gray-900 text-white rounded-lg shadow-md p-6">
        <h3 class="text-2xl font-semibold mb-4">Enterprise</h3>
        <p class="text-gray-400 mb-6">For large businesses and enterprises.</p>
        <div class="text-4xl font-bold mb-6">
          $99<span class="text-xl">/mo</span>
        </div>
        <ul class="mb-6 space-y-4">
          <li>✔ Unlimited Projects</li>
          <li>✔ Dedicated Support</li>
          <li>✔ Custom Integrations</li>
        </ul>
        <button class="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300">Get Started</button>
      </div>
    </div>
  </div>
  
  )
}
