import { Page, ElementHandle } from '@playwright/test';

export class CarouselPage {
  private page: Page;
  private carouselLocator: string;

  constructor(page: Page) {
    this.page = page;
    this.carouselLocator = 'div.slider__controls.carousel';
  }

  async clickCarouselItem(index: number): Promise<void> {
    const itemLocator = `${this.carouselLocator} > div.slider__control.carousel-cell:nth-child(${index + 1})`;
    await this.page.click(itemLocator);
  }

  async getCarouselItemCount(): Promise<number> {
    const items = await this.page.$$(`${this.carouselLocator} > div.slider__control.carousel-cell`);
    return items.length;
  }

  async isCarouselCellSelected(index: number): Promise<boolean> {
    const itemLocator = `${this.carouselLocator} > div.slider__control.carousel-cell:nth-child(${index + 1})`;
    const itemClass = await this.page.getAttribute(itemLocator, 'class');
    return itemClass!.includes('is-selected');
  }

  async getCarouselCellByIndex(index: number): Promise<ElementHandle | null> {
    const itemLocator = `${this.carouselLocator} > div.slider__control.carousel-cell:nth-child(${index + 1})`;
    return await this.page.$(itemLocator);
  }

  async getCarouselCells(): Promise<ElementHandle[]> {
    return await this.page.$$('div.slider__slides > div.slider__slide');
  }

  async isCellVisible(index: number): Promise<boolean> {
    const cells = await this.getCarouselCells();
    const cellClass = await cells[index].getAttribute('class');
    return !cellClass!.includes('display--hidden');
  }
}

