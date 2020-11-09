class Github {
  constructor() {
    this.client_id = 'cf0d333f57abe0450b4c';
    this.client_secret = '3b4bf04f61638b6a8dd3a9cd42173c2049eea529';

  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profileData = await profileResponse.json();

    return {
      profile
    }
  }
}