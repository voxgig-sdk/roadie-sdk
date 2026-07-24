# ProjectName SDK exists test

import pytest
from roadie_sdk import RoadieSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = RoadieSDK.test(None, None)
        assert testsdk is not None
