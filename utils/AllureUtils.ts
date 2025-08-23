import { allure } from 'allure-playwright';

export class AllureUtils {
  /**
   * Add test description
   */
  static description(text: string) {
    allure.description(text);
  }

  /**
   * Add test story/epic
   */
  static story(name: string) {
    allure.story(name);
  }

  /**
   * Add test feature
   */
  static feature(name: string) {
    allure.feature(name);
  }

  /**
   * Add test severity
   */
  static severity(level: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial') {
    allure.severity(level);
  }

  /**
   * Add test owner
   */
  static owner(name: string) {
    allure.owner(name);
  }

  /**
   * Add test lead
   */
  static lead(name: string) {
    // Note: lead function not available in current Allure version
    // Using label instead for similar functionality
    allure.label('lead', name);
  }

  /**
   * Add test layer
   */
  static layer(name: string) {
    allure.layer(name);
  }

  /**
   * Add test tags
   */
  static tag(...tags: string[]) {
    tags.forEach(tag => allure.tag(tag));
  }

  /**
   * Add test parameter
   */
  static parameter(name: string, value: string) {
    // Note: parameter function not available in current Allure version
    // Using addParameter instead
    allure.addParameter(name, value);
  }

  /**
   * Add test link
   */
  static link(url: string, name?: string, type?: string) {
    allure.link(url, name, type);
  }

  /**
   * Add test issue
   */
  static issue(name: string, url?: string) {
    allure.issue(name, url);
  }

  /**
   * Add test TMS link
   */
  static tms(name: string, url?: string) {
    allure.tms(name, url);
  }

  /**
   * Add step with description
   */
  static step(name: string, fn: () => void | Promise<void>) {
    return allure.step(name, fn);
  }

  /**
   * Add attachment
   */
  static attachment(name: string, content: Buffer | string, type?: string) {
    allure.attachment(name, content, type);
  }

  /**
   * Add test environment info
   */
  static environment(name: string, value: string) {
    // Note: environment function not available in current Allure version
    // Using label instead for similar functionality
    allure.label('environment', `${name}: ${value}`);
  }

  /**
   * Add test label
   */
  static label(name: string, value: string) {
    allure.label(name, value);
  }

  /**
   * Add test ID
   */
  static id(id: string) {
    allure.id(id);
  }

  /**
   * Add test suite
   */
  static suite(name: string) {
    allure.suite(name);
  }

  /**
   * Add test parent suite
   */
  static parentSuite(name: string) {
    allure.parentSuite(name);
  }

  /**
   * Add test sub suite
   */
  static subSuite(name: string) {
    allure.subSuite(name);
  }
}
