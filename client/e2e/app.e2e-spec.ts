import { BloodDonationPlatformPage } from './app.po';

describe('blood-donations-platform App', () => {
  let page: BloodDonationPlatformPage;

  beforeEach(() => {
    page = new BloodDonationPlatformPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
