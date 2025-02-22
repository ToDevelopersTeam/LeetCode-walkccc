class Solution {
 public:
  int minCharacters(string a, string b) {
    const int m = a.length();
    const int n = b.length();
    vector<int> countA(128);
    vector<int> countB(128);

    for (const char c : a)
      ++countA[c];

    for (const char c : b)
      ++countB[c];

    int ans = INT_MAX;
    int prevA = 0;  // the number of characters in a <= c
    int prevB = 0;  // the number of characters in b <= c

    for (char c = 'a'; c <= 'z'; ++c) {
      // the condition 3
      ans = min(ans, m + n - countA[c] - countB[c]);
      // the conditions 1 and 2
      if (c > 'a')
        ans = min({ans, m - prevA + prevB, n - prevB + prevA});
      prevA += countA[c];
      prevB += countB[c];
    }

    return ans;
  }
};
