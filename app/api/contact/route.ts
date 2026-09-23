import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Resend lazily to avoid build-time errors when API key is not available
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryType, name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message || !inquiryType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if template ID is provided and valid
    const contactTemplateId = process.env.RESEND_CONTACT_TEMPLATE_ID?.trim();
    const useTemplate = contactTemplateId && 
                        contactTemplateId !== 'your_contact_template_id_here' && 
                        contactTemplateId.length > 0;
    
    // Debug logging - show what template ID is being used
    console.log('Contact Template Configuration:', {
      templateIdFromEnv: contactTemplateId,
      willUseTemplate: useTemplate,
      expectedId: 'contact-form-email'
    });
    
    if (useTemplate) {
      console.log('✓ Using Resend template:', contactTemplateId);
    } else {
      console.log('✗ Using inline HTML (template ID not found or invalid)');
    }

    // Prepare HTML content (always needed as fallback)
    const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
              .content { background: #ffffff; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
              .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
              .field-label { font-weight: 600; color: #4b5563; font-size: 14px; margin-bottom: 5px; }
              .field-value { color: #1f2937; font-size: 14px; }
              .message-box { background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin-top: 20px; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Contact Inquiry</h1>
                <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">OLL Academy Contact Form</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">Inquiry Type:</div>
                  <div class="field-value">${inquiryType}</div>
                </div>
                <div class="field">
                  <div class="field-label">Name:</div>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email:</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Phone:</div>
                  <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                <div class="message-box">
                  <div class="field-label" style="margin-bottom: 10px;">Message:</div>
                  <div class="field-value" style="white-space: pre-wrap;">${message}</div>
                </div>
                <div class="footer">
                  <p style="margin: 0;">This email was sent from the OLL Academy contact form.</p>
                  <p style="margin: 5px 0 0;">Reply directly to <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

    // Send email to admin using Resend template
    const adminEmailPayload: {
      from: string;
      to: string;
      replyTo: string;
      subject: string;
      template?: { id: string; variables: Record<string, string> };
      html?: string;
    } = {
      from: process.env.RESEND_FROM_EMAIL || 'support@ollacademy.com',
      to: process.env.RESEND_CONTACT_EMAIL || 'support@ollacademy.com',
      replyTo: email,
      subject: `New Contact Inquiry: ${inquiryType}`,
    };

    if (useTemplate) {
      // Use Resend template - correct format: template object with id and variables
      const templateVariables = {
        inquiry_type: inquiryType,
        from_name: name,
        from_email: email,
        phone: phone,
        message: message,
        logo_url: process.env.RESEND_LOGO_URL || 'https://ollacademy.com/logo.svg',
      };
      adminEmailPayload.template = {
        id: contactTemplateId, // Should be: re_contact-form-email from .env.local
        variables: templateVariables,
      };
      console.log('Sending admin email with Resend template:', {
        templateId: contactTemplateId,
        expectedId: 'contact-form-email',
        matches: contactTemplateId === 'contact-form-email',
        variables: templateVariables,
      });
    } else {
      // Use inline HTML when template is not available
      adminEmailPayload.html = htmlContent;
      console.log('Using inline HTML (template not configured)');
    }

    const resend = getResend();
    // Resend CreateEmailOptions is a discriminated union; payload is built dynamically.
    let adminEmailResult = await resend.emails.send(
      adminEmailPayload as Parameters<typeof resend.emails.send>[0]
    );

    // If template fails, retry with html fallback
    if (adminEmailResult.error && useTemplate) {
      console.error('❌ Template failed! Details:', {
        templateId: contactTemplateId,
        error: adminEmailResult.error,
        message: adminEmailResult.error.message,
        statusCode: adminEmailResult.error.statusCode,
        troubleshooting: 'Check RESEND_TEMPLATE_TROUBLESHOOTING.md for help'
      });
      console.warn('Retrying with HTML fallback...');
      // Remove template and use html instead
      delete adminEmailPayload.template;
      adminEmailPayload.html = htmlContent;
      adminEmailResult = await resend.emails.send(
        adminEmailPayload as Parameters<typeof resend.emails.send>[0]
      );
    }

    if (adminEmailResult.error) {
      console.error('Resend admin email error:', adminEmailResult.error);
      return NextResponse.json(
        { error: `Failed to send email: ${adminEmailResult.error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    // Add delay to avoid Resend rate limit (2 requests per second)
    // Wait 600ms before sending confirmation email
    await new Promise(resolve => setTimeout(resolve, 600));

    // Check if confirmation template ID is provided and valid
    const confirmationTemplateId = process.env.RESEND_CONTACT_CONFIRMATION_TEMPLATE_ID?.trim();
    const useConfirmationTemplate = confirmationTemplateId && 
                                    confirmationTemplateId !== 'your_contact_confirmation_template_id_here' && 
                                    confirmationTemplateId.length > 0;
    
    // Debug logging - show what confirmation template ID is being used
    console.log('Contact Confirmation Template Configuration:', {
      templateIdFromEnv: confirmationTemplateId,
      willUseTemplate: useConfirmationTemplate,
      expectedId: 'contact-form-acknowledgment'
    });

    // Prepare confirmation HTML content (always needed as fallback)
    const confirmationHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1E4B8E 0%, #2869C3 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
              .content { background: #ffffff; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
              .message { color: #374151; font-size: 16px; line-height: 1.8; margin-bottom: 20px; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
              </div>
              <div class="content">
                <p class="message">Dear ${name},</p>
                <p class="message">Thank you for reaching out to OLL Academy. We've received your inquiry regarding <strong>${inquiryType}</strong> and will get back to you within 24 hours during business days.</p>
                <p class="message">Our team is committed to providing you with the best support and will respond to your message as soon as possible.</p>
                <p class="message">Best regards,<br>The OLL Academy Team</p>
                <div class="footer">
                  <p style="margin: 0;">This is an automated confirmation email. Please do not reply to this message.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

    // Send confirmation email to user
    const userEmailPayload: {
      from: string;
      to: string;
      subject: string;
      template?: { id: string; variables: Record<string, string> };
      html?: string;
    } = {
      from: process.env.RESEND_FROM_EMAIL || 'support@ollacademy.com',
      to: email,
      subject: 'Thank You for Contacting OLL Academy',
    };

    if (useConfirmationTemplate) {
      // Use Resend template - correct format: template object with id and variables
      const confirmationVariables = {
        user_name: name,
        inquiry_type: inquiryType,
        logo_url: process.env.RESEND_LOGO_URL || 'https://ollacademy.com/logo.svg',
      };
      userEmailPayload.template = {
        id: confirmationTemplateId, // Should be: re_contact-form-acknowledgment from .env.local
        variables: confirmationVariables,
      };
      console.log('Sending confirmation email with Resend template:', {
        templateId: confirmationTemplateId,
        expectedId: 'contact-form-acknowledgment',
        matches: confirmationTemplateId === 'contact-form-acknowledgment',
        variables: confirmationVariables,
      });
    } else {
      // Use inline HTML when template is not available
      userEmailPayload.html = confirmationHtml;
      console.log('Using inline HTML for confirmation (template not configured)');
    }

    const resendConfirmation = getResend();
    let userEmailResult = await resendConfirmation.emails.send(
      userEmailPayload as Parameters<typeof resendConfirmation.emails.send>[0]
    );

    // Handle rate limit errors - retry after delay
    if (userEmailResult.error && userEmailResult.error.statusCode === 429) {
      console.warn('Rate limit hit, waiting 1 second before retry...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      userEmailResult = await resendConfirmation.emails.send(
        userEmailPayload as Parameters<typeof resendConfirmation.emails.send>[0]
      );
    }

    // If template fails, retry with html fallback
    if (userEmailResult.error && useConfirmationTemplate) {
      console.error('❌ Confirmation template failed! Details:', {
        templateId: confirmationTemplateId,
        error: userEmailResult.error,
        message: userEmailResult.error.message,
        statusCode: userEmailResult.error.statusCode,
        troubleshooting: 'Check RESEND_TEMPLATE_TROUBLESHOOTING.md for help'
      });
      console.warn('Retrying with HTML fallback...');
      // Remove template and use html instead
      delete userEmailPayload.template;
      userEmailPayload.html = confirmationHtml;
      userEmailResult = await resendConfirmation.emails.send(
        userEmailPayload as Parameters<typeof resendConfirmation.emails.send>[0]
      );
    }

    if (userEmailResult.error) {
      console.error('Resend user confirmation email error:', userEmailResult.error);
      // Don't fail the request if user email fails, admin email was sent successfully
    }

    return NextResponse.json(
      { success: true, messageId: adminEmailResult.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
