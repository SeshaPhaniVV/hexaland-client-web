import { shallowMount } from '@vue/test-utils';
import ActionCard from '@/components/ActionCard';

describe('ActionCard', () => {
  describe('test render', () => {
    test('should render and match the snapshot', () => {
      const wrapper = shallowMount(ActionCard);

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
