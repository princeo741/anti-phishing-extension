document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      let url = new URL(tabs[0].url);
      let trustScore = calculateTrustScore(url);
      document.getElementById('trust-score').innerText = `Trust Score: ${trustScore}%`;
    });
  
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === "checkURL") {
        let url = new URL(request.url);
        let trustScore = calculateTrustScore(url);
        document.getElementById('trust-score').innerText = `Trust Score: ${trustScore}%`;
      }
    });
  
    function calculateTrustScore(url) {
      // Parameter 1: Check if the URL uses HTTPS
      let score = url.protocol === 'https:' ? 100 : 50;
  
      // Add more parameters here to refine the trust score
      return score;
    }
  });
  