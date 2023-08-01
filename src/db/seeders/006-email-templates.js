
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('email_template', [
            { 
                id: 1,
                name: 'Template Cultivo',
                template: '\"{\\\"counters\\\":{\\\"u_column\\\":4,\\\"u_row\\\":4,\\\"u_content_image\\\":1,\\\"u_content_heading\\\":1,\\\"u_content_text\\\":1},\\\"body\\\":{\\\"id\\\":\\\"xivoic_1K3\\\",\\\"rows\\\":[{\\\"id\\\":\\\"9xjpguplnV\\\",\\\"cells\\\":[1],\\\"columns\\\":[{\\\"id\\\":\\\"GiMDS5fsVG\\\",\\\"contents\\\":[{\\\"id\\\":\\\"5_KvzZp7Q-\\\",\\\"type\\\":\\\"heading\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"10px\\\",\\\"anchor\\\":\\\"\\\",\\\"headingType\\\":\\\"h1\\\",\\\"fontSize\\\":\\\"22px\\\",\\\"textAlign\\\":\\\"center\\\",\\\"lineHeight\\\":\\\"140%\\\",\\\"linkStyle\\\":{\\\"inherit\\\":true,\\\"linkColor\\\":\\\"#0000ee\\\",\\\"linkHoverColor\\\":\\\"#0000ee\\\",\\\"linkUnderline\\\":true,\\\"linkHoverUnderline\\\":true},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_heading_1\\\",\\\"htmlClassNames\\\":\\\"u_content_heading\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true,\\\"text\\\":\\\"TITULO EJEMPLO\\\"}}],\\\"values\\\":{\\\"backgroundColor\\\":\\\"#ffffff\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_1\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}}],\\\"values\\\":{\\\"displayCondition\\\":null,\\\"columns\\\":false,\\\"backgroundColor\\\":\\\"\\\",\\\"columnsBackgroundColor\\\":\\\"\\\",\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":false,\\\"size\\\":\\\"custom\\\",\\\"repeat\\\":\\\"no-repeat\\\",\\\"position\\\":\\\"center\\\",\\\"customPosition\\\":[\\\"50%\\\",\\\"50%\\\"]},\\\"padding\\\":\\\"0px\\\",\\\"anchor\\\":\\\"\\\",\\\"hideDesktop\\\":false,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_row_1\\\",\\\"htmlClassNames\\\":\\\"u_row\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true,\\\"_override\\\":{\\\"desktop\\\":{\\\"hideDesktop\\\":false}}}},{\\\"id\\\":\\\"oeDljGEShS\\\",\\\"cells\\\":[1],\\\"columns\\\":[{\\\"id\\\":\\\"xzluKA9jj-\\\",\\\"contents\\\":[{\\\"id\\\":\\\"Sk25f1TSFT\\\",\\\"type\\\":\\\"image\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"0px\\\",\\\"anchor\\\":\\\"\\\",\\\"src\\\":{\\\"url\\\":\\\"https://assets.unlayer.com/stock-templates1689224710827-cultivo-mis-derechos-logo.png\\\",\\\"width\\\":2048,\\\"height\\\":2048},\\\"textAlign\\\":\\\"center\\\",\\\"altText\\\":\\\"\\\",\\\"action\\\":{\\\"name\\\":\\\"web\\\",\\\"values\\\":{\\\"href\\\":\\\"\\\",\\\"target\\\":\\\"_blank\\\"}},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_image_1\\\",\\\"htmlClassNames\\\":\\\"u_content_image\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}}],\\\"values\\\":{\\\"backgroundColor\\\":\\\"#ffffff\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"borderRadius\\\":\\\"0px\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_2\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}}],\\\"values\\\":{\\\"displayCondition\\\":null,\\\"columns\\\":false,\\\"backgroundColor\\\":\\\"\\\",\\\"columnsBackgroundColor\\\":\\\"\\\",\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"custom\\\",\\\"position\\\":\\\"center\\\"},\\\"padding\\\":\\\"0px\\\",\\\"anchor\\\":\\\"\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_row_2\\\",\\\"htmlClassNames\\\":\\\"u_row\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}},{\\\"id\\\":\\\"QFhOB7aTaT\\\",\\\"cells\\\":[1],\\\"columns\\\":[{\\\"id\\\":\\\"0XDeNNDmqG\\\",\\\"contents\\\":[{\\\"id\\\":\\\"2Agk0fgWQf\\\",\\\"type\\\":\\\"text\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"10px\\\",\\\"anchor\\\":\\\"\\\",\\\"fontSize\\\":\\\"14px\\\",\\\"textAlign\\\":\\\"center\\\",\\\"lineHeight\\\":\\\"140%\\\",\\\"linkStyle\\\":{\\\"body\\\":false,\\\"inherit\\\":false,\\\"linkColor\\\":\\\"#95a5a6\\\",\\\"linkUnderline\\\":true,\\\"linkHoverColor\\\":\\\"#0000ee\\\",\\\"linkHoverUnderline\\\":true},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_text_1\\\",\\\"htmlClassNames\\\":\\\"u_content_text\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true,\\\"text\\\":\\\"<p style=\\\\\\\"line-height: 140%;\\\\\\\"><span style=\\\\\\\"line-height: 19.6px;\\\\\\\"><span style=\\\\\\\"line-height: 19.6px;\\\\\\\"><a rel=\\\\\\\"noopener\\\\\\\" href=\\\\\\\"https://www.google.com.ar\\\\\\\" target=\\\\\\\"_blank\\\\\\\" data-u-link-value=\\\\\\\"eyJuYW1lIjoid2ViIiwiYXR0cnMiOnsiaHJlZiI6Int7aHJlZn19IiwidGFyZ2V0Ijoie3t0YXJnZXR9fSJ9LCJ2YWx1ZXMiOnsiaHJlZiI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20uYXIiLCJ0YXJnZXQiOiJfYmxhbmsifX0=\\\\\\\">Unsuscribe</a></span></span></p>\\\"}}],\\\"values\\\":{\\\"backgroundColor\\\":\\\"#ffffff\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"borderRadius\\\":\\\"0px\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_3\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}}],\\\"values\\\":{\\\"displayCondition\\\":null,\\\"columns\\\":false,\\\"backgroundColor\\\":\\\"\\\",\\\"columnsBackgroundColor\\\":\\\"\\\",\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"custom\\\",\\\"position\\\":\\\"center\\\"},\\\"padding\\\":\\\"0px\\\",\\\"anchor\\\":\\\"\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_row_3\\\",\\\"htmlClassNames\\\":\\\"u_row\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}}],\\\"values\\\":{\\\"popupPosition\\\":\\\"center\\\",\\\"popupWidth\\\":\\\"600px\\\",\\\"popupHeight\\\":\\\"auto\\\",\\\"borderRadius\\\":\\\"10px\\\",\\\"contentAlign\\\":\\\"center\\\",\\\"contentVerticalAlign\\\":\\\"center\\\",\\\"contentWidth\\\":\\\"500px\\\",\\\"fontFamily\\\":{\\\"label\\\":\\\"Arial\\\",\\\"value\\\":\\\"arial,helvetica,sans-serif\\\"},\\\"textColor\\\":\\\"#000000\\\",\\\"popupBackgroundColor\\\":\\\"#FFFFFF\\\",\\\"popupBackgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"cover\\\",\\\"position\\\":\\\"center\\\"},\\\"popupOverlay_backgroundColor\\\":\\\"rgba(0, 0, 0, 0.1)\\\",\\\"popupCloseButton_position\\\":\\\"top-right\\\",\\\"popupCloseButton_backgroundColor\\\":\\\"#DDDDDD\\\",\\\"popupCloseButton_iconColor\\\":\\\"#000000\\\",\\\"popupCloseButton_borderRadius\\\":\\\"0px\\\",\\\"popupCloseButton_margin\\\":\\\"0px\\\",\\\"popupCloseButton_action\\\":{\\\"name\\\":\\\"close_popup\\\",\\\"attrs\\\":{\\\"onClick\\\":\\\"document.querySelector(\'.u-popup-container\').style.display = \'none\';\\\"}},\\\"backgroundColor\\\":\\\"#e7e7e7\\\",\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"custom\\\",\\\"position\\\":\\\"center\\\"},\\\"preheaderText\\\":\\\"\\\",\\\"linkStyle\\\":{\\\"body\\\":true,\\\"linkColor\\\":\\\"#0000ee\\\",\\\"linkHoverColor\\\":\\\"#0000ee\\\",\\\"linkUnderline\\\":true,\\\"linkHoverUnderline\\\":true},\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_body\\\",\\\"htmlClassNames\\\":\\\"u_body\\\"}}},\\\"schemaVersion\\\":15}\"',
            },
            { 
                id: 2,
                name: 'Template Reprocann',
                template: '\"{\\\"counters\\\":{\\\"u_column\\\":23,\\\"u_row\\\":7,\\\"u_content_image\\\":11,\\\"u_content_divider\\\":1,\\\"u_content_text\\\":1},\\\"body\\\":{\\\"id\\\":\\\"MJwZtbsf6S\\\",\\\"rows\\\":[{\\\"id\\\":\\\"VkL_r49Zph\\\",\\\"cells\\\":[1],\\\"columns\\\":[{\\\"id\\\":\\\"nA87NJZcPa\\\",\\\"contents\\\":[{\\\"id\\\":\\\"msnnwHXmmM\\\",\\\"type\\\":\\\"image\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"10px\\\",\\\"anchor\\\":\\\"\\\",\\\"src\\\":{\\\"url\\\":\\\"https://assets.unlayer.com/stock-templates1689405690808-cultivo-mis-derechos-logo-header.png\\\",\\\"width\\\":1384,\\\"height\\\":580,\\\"autoWidth\\\":false,\\\"maxWidth\\\":\\\"26%\\\"},\\\"textAlign\\\":\\\"center\\\",\\\"altText\\\":\\\"\\\",\\\"action\\\":{\\\"name\\\":\\\"web\\\",\\\"values\\\":{\\\"href\\\":\\\"\\\",\\\"target\\\":\\\"_blank\\\"}},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_image_3\\\",\\\"htmlClassNames\\\":\\\"u_content_image\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}},{\\\"id\\\":\\\"CzJXj0WyaO\\\",\\\"type\\\":\\\"divider\\\",\\\"values\\\":{\\\"width\\\":\\\"100%\\\",\\\"border\\\":{\\\"borderTopWidth\\\":\\\"1px\\\",\\\"borderTopStyle\\\":\\\"solid\\\",\\\"borderTopColor\\\":\\\"#BBBBBB\\\"},\\\"textAlign\\\":\\\"center\\\",\\\"containerPadding\\\":\\\"10px\\\",\\\"anchor\\\":\\\"\\\",\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_divider_1\\\",\\\"htmlClassNames\\\":\\\"u_content_divider\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}}],\\\"values\\\":{\\\"backgroundColor\\\":\\\"#ffffff\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_1\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}}],\\\"values\\\":{\\\"displayCondition\\\":null,\\\"columns\\\":false,\\\"backgroundColor\\\":\\\"\\\",\\\"columnsBackgroundColor\\\":\\\"\\\",\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"size\\\":\\\"custom\\\",\\\"repeat\\\":\\\"no-repeat\\\",\\\"position\\\":\\\"center\\\"},\\\"padding\\\":\\\"0px\\\",\\\"anchor\\\":\\\"\\\",\\\"hideDesktop\\\":false,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_row_1\\\",\\\"htmlClassNames\\\":\\\"u_row\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}},{\\\"id\\\":\\\"soEn97Ue2N\\\",\\\"cells\\\":[33.33,33.33,33.34],\\\"columns\\\":[{\\\"id\\\":\\\"ohRBzVxTrq\\\",\\\"contents\\\":[{\\\"id\\\":\\\"ZctGVJruPq\\\",\\\"type\\\":\\\"image\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"20px\\\",\\\"anchor\\\":\\\"\\\",\\\"src\\\":{\\\"url\\\":\\\"https://assets.unlayer.com/stock-templates1689406004708-cmd-1.jpg\\\",\\\"width\\\":480,\\\"height\\\":480},\\\"textAlign\\\":\\\"center\\\",\\\"altText\\\":\\\"\\\",\\\"action\\\":{\\\"name\\\":\\\"web\\\",\\\"values\\\":{\\\"href\\\":\\\"\\\",\\\"target\\\":\\\"_blank\\\"}},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_image_4\\\",\\\"htmlClassNames\\\":\\\"u_content_image\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}}],\\\"values\\\":{\\\"backgroundColor\\\":\\\"#ffffff\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"borderRadius\\\":\\\"0px\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_4\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}},{\\\"id\\\":\\\"ZiTyBTOV2j\\\",\\\"contents\\\":[{\\\"id\\\":\\\"pPhGY57gS2\\\",\\\"type\\\":\\\"image\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"20px\\\",\\\"anchor\\\":\\\"\\\",\\\"src\\\":{\\\"url\\\":\\\"https://assets.unlayer.com/stock-templates1689406020948-cmd-2.jpg\\\",\\\"width\\\":480,\\\"height\\\":480},\\\"textAlign\\\":\\\"center\\\",\\\"altText\\\":\\\"\\\",\\\"action\\\":{\\\"name\\\":\\\"web\\\",\\\"values\\\":{\\\"href\\\":\\\"\\\",\\\"target\\\":\\\"_blank\\\"}},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_image_5\\\",\\\"htmlClassNames\\\":\\\"u_content_image\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}}],\\\"values\\\":{\\\"backgroundColor\\\":\\\"\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"borderRadius\\\":\\\"0px\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_11\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}},{\\\"id\\\":\\\"4PHu2__aDH\\\",\\\"contents\\\":[{\\\"id\\\":\\\"ZINaYChX0M\\\",\\\"type\\\":\\\"image\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"20px\\\",\\\"anchor\\\":\\\"\\\",\\\"src\\\":{\\\"url\\\":\\\"https://assets.unlayer.com/stock-templates1689406023697-cmd-3.jpg\\\",\\\"width\\\":591,\\\"height\\\":591},\\\"textAlign\\\":\\\"center\\\",\\\"altText\\\":\\\"\\\",\\\"action\\\":{\\\"name\\\":\\\"web\\\",\\\"values\\\":{\\\"href\\\":\\\"\\\",\\\"target\\\":\\\"_blank\\\"}},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_image_6\\\",\\\"htmlClassNames\\\":\\\"u_content_image\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}}],\\\"values\\\":{\\\"backgroundColor\\\":\\\"\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"borderRadius\\\":\\\"0px\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_12\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}}],\\\"values\\\":{\\\"displayCondition\\\":null,\\\"columns\\\":false,\\\"backgroundColor\\\":\\\"#ffffff\\\",\\\"columnsBackgroundColor\\\":\\\"\\\",\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"custom\\\",\\\"position\\\":\\\"center\\\"},\\\"padding\\\":\\\"0px\\\",\\\"anchor\\\":\\\"\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_row_2\\\",\\\"htmlClassNames\\\":\\\"u_row\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true,\\\"_override\\\":{\\\"mobile\\\":{\\\"noStackMobile\\\":false}}}},{\\\"id\\\":\\\"JKkPFs8hEY\\\",\\\"cells\\\":[1,1],\\\"columns\\\":[{\\\"id\\\":\\\"tT0eKs8EqL\\\",\\\"contents\\\":[{\\\"id\\\":\\\"Ee-R_TTGNp\\\",\\\"type\\\":\\\"text\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"10px\\\",\\\"anchor\\\":\\\"\\\",\\\"fontSize\\\":\\\"14px\\\",\\\"textAlign\\\":\\\"left\\\",\\\"lineHeight\\\":\\\"140%\\\",\\\"linkStyle\\\":{\\\"body\\\":false,\\\"inherit\\\":false,\\\"linkColor\\\":\\\"#34495e\\\",\\\"linkUnderline\\\":true,\\\"linkHoverColor\\\":\\\"#0000ee\\\",\\\"linkHoverUnderline\\\":true},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_text_1\\\",\\\"htmlClassNames\\\":\\\"u_content_text\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true,\\\"text\\\":\\\"<p style=\\\\\\\"line-height: 140%;\\\\\\\">© <a rel=\\\\\\\"noopener\\\\\\\" href=\\\\\\\"http://www.cultivomisderechos.com.ar\\\\\\\" target=\\\\\\\"_blank\\\\\\\" data-u-link-value=\\\\\\\"eyJuYW1lIjoid2ViIiwiYXR0cnMiOnsiaHJlZiI6Int7aHJlZn19IiwidGFyZ2V0Ijoie3t0YXJnZXR9fSJ9LCJ2YWx1ZXMiOnsiaHJlZiI6Imh0dHA6Ly93d3cuY3VsdGl2b21pc2RlcmVjaG9zLmNvbS5hciIsInRhcmdldCI6Il9ibGFuayJ9fQ==\\\\\\\">Cultivo mis derechos</a> 2023.</p>\\\"}}],\\\"values\\\":{\\\"backgroundColor\\\":\\\"\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"borderRadius\\\":\\\"0px\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_13\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}},{\\\"id\\\":\\\"akuJ7hDd1-\\\",\\\"contents\\\":[{\\\"id\\\":\\\"5yexUMTWQx\\\",\\\"type\\\":\\\"image\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"5px\\\",\\\"anchor\\\":\\\"\\\",\\\"src\\\":{\\\"url\\\":\\\"https://assets.unlayer.com/stock-templates1689406542778-fb-logo.jpg\\\",\\\"width\\\":128,\\\"height\\\":124,\\\"autoWidth\\\":false,\\\"maxWidth\\\":\\\"10%\\\"},\\\"textAlign\\\":\\\"right\\\",\\\"altText\\\":\\\"\\\",\\\"action\\\":{\\\"name\\\":\\\"web\\\",\\\"values\\\":{\\\"href\\\":\\\"\\\",\\\"target\\\":\\\"_blank\\\"}},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_image_9\\\",\\\"htmlClassNames\\\":\\\"u_content_image\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}},{\\\"id\\\":\\\"Y7kAJViKiE\\\",\\\"type\\\":\\\"image\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"5px\\\",\\\"anchor\\\":\\\"\\\",\\\"src\\\":{\\\"url\\\":\\\"https://assets.unlayer.com/stock-templates1689406548385-wp-logo.jpg\\\",\\\"width\\\":128,\\\"height\\\":124,\\\"autoWidth\\\":false,\\\"maxWidth\\\":\\\"10%\\\"},\\\"textAlign\\\":\\\"right\\\",\\\"altText\\\":\\\"\\\",\\\"action\\\":{\\\"name\\\":\\\"web\\\",\\\"values\\\":{\\\"href\\\":\\\"\\\",\\\"target\\\":\\\"_blank\\\"}},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_image_10\\\",\\\"htmlClassNames\\\":\\\"u_content_image\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}},{\\\"id\\\":\\\"xo35xyEWfn\\\",\\\"type\\\":\\\"image\\\",\\\"values\\\":{\\\"containerPadding\\\":\\\"5px\\\",\\\"anchor\\\":\\\"\\\",\\\"src\\\":{\\\"url\\\":\\\"https://assets.unlayer.com/stock-templates1689406575750-ig-logo.jpg\\\",\\\"width\\\":128,\\\"height\\\":124,\\\"autoWidth\\\":false,\\\"maxWidth\\\":\\\"10%\\\"},\\\"textAlign\\\":\\\"right\\\",\\\"altText\\\":\\\"\\\",\\\"action\\\":{\\\"name\\\":\\\"web\\\",\\\"values\\\":{\\\"href\\\":\\\"\\\",\\\"target\\\":\\\"_blank\\\"}},\\\"displayCondition\\\":null,\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_content_image_11\\\",\\\"htmlClassNames\\\":\\\"u_content_image\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}}],\\\"values\\\":{\\\"backgroundColor\\\":\\\"\\\",\\\"padding\\\":\\\"0px\\\",\\\"border\\\":{},\\\"borderRadius\\\":\\\"0px\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_column_14\\\",\\\"htmlClassNames\\\":\\\"u_column\\\"}}}],\\\"values\\\":{\\\"displayCondition\\\":null,\\\"columns\\\":false,\\\"backgroundColor\\\":\\\"#ffffff\\\",\\\"columnsBackgroundColor\\\":\\\"\\\",\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"custom\\\",\\\"position\\\":\\\"center\\\"},\\\"padding\\\":\\\"0px\\\",\\\"anchor\\\":\\\"\\\",\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_row_4\\\",\\\"htmlClassNames\\\":\\\"u_row\\\"},\\\"selectable\\\":true,\\\"draggable\\\":true,\\\"duplicatable\\\":true,\\\"deletable\\\":true,\\\"hideable\\\":true}}],\\\"values\\\":{\\\"popupPosition\\\":\\\"center\\\",\\\"popupWidth\\\":\\\"600px\\\",\\\"popupHeight\\\":\\\"auto\\\",\\\"borderRadius\\\":\\\"10px\\\",\\\"contentAlign\\\":\\\"center\\\",\\\"contentVerticalAlign\\\":\\\"center\\\",\\\"contentWidth\\\":\\\"500px\\\",\\\"fontFamily\\\":{\\\"label\\\":\\\"Arial\\\",\\\"value\\\":\\\"arial,helvetica,sans-serif\\\"},\\\"textColor\\\":\\\"#000000\\\",\\\"popupBackgroundColor\\\":\\\"#FFFFFF\\\",\\\"popupBackgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"cover\\\",\\\"position\\\":\\\"center\\\"},\\\"popupOverlay_backgroundColor\\\":\\\"rgba(0, 0, 0, 0.1)\\\",\\\"popupCloseButton_position\\\":\\\"top-right\\\",\\\"popupCloseButton_backgroundColor\\\":\\\"#DDDDDD\\\",\\\"popupCloseButton_iconColor\\\":\\\"#000000\\\",\\\"popupCloseButton_borderRadius\\\":\\\"0px\\\",\\\"popupCloseButton_margin\\\":\\\"0px\\\",\\\"popupCloseButton_action\\\":{\\\"name\\\":\\\"close_popup\\\",\\\"attrs\\\":{\\\"onClick\\\":\\\"document.querySelector(\'.u-popup-container\').style.display = \'none\';\\\"}},\\\"backgroundColor\\\":\\\"#e7e7e7\\\",\\\"backgroundImage\\\":{\\\"url\\\":\\\"\\\",\\\"fullWidth\\\":true,\\\"repeat\\\":\\\"no-repeat\\\",\\\"size\\\":\\\"custom\\\",\\\"position\\\":\\\"center\\\"},\\\"preheaderText\\\":\\\"\\\",\\\"linkStyle\\\":{\\\"body\\\":true,\\\"linkColor\\\":\\\"#0000ee\\\",\\\"linkHoverColor\\\":\\\"#0000ee\\\",\\\"linkUnderline\\\":true,\\\"linkHoverUnderline\\\":true},\\\"_meta\\\":{\\\"htmlID\\\":\\\"u_body\\\",\\\"htmlClassNames\\\":\\\"u_body\\\"}}},\\\"schemaVersion\\\":15}\"',
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('email_template', null, {});
    }
};

